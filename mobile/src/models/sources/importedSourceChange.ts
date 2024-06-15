import Source from "./source";
import { load } from "cheerio";
import axios from "axios";
import Novel from "../novel";

function cleanContent(content: string) {
  return content.replace(/\n\n/g, "\n");
}

export default class LightNovelHeaven extends Source {
  getTotalPage(): number {
    throw new Error("Method not implemented.");
  }
  static title = "Light Novel Heaven";
  static importURL = "https://lightnovelheaven.com";
  static idToCreate = 3;
  constructor() {
    super();
    this.id = 3;
    this.sourceTitle = "Light Novel Heaven";
    this.baseUrl = "https://lightnovelheaven.com/";
    this.thumbnail =
      "https://lightnovelheaven.com/wp-content/uploads/2020/07/cropped-mid-2-192x192.png";
    this.readLanguage = "English";
  }

  async getId(): Promise<number>{
    return this.id;
  }

  async createInstance(): Promise<Source> {
    return new LightNovelHeaven();
  }

  // List of novels shown by filter
  async findNovelsByFilter(filter: string, page: number): Promise<Novel[]> {
    // Get the appropriate url for the filter
    switch (filter) {
      case "filterNovels.popular":
        filter = "";
        break;
      case "filterNovels.trending":
        filter = "trending";
        break;
      case "filterNovels.latest":
        filter = "latest";
        break;
      case "filterNovels.A-Z":
        filter = "alphabet";
        break;
      default:
        filter = "latest";
        break;
    }


    const sourceId = this.id;
    const baseUrl = this.baseUrl;

    // function to parse the body reposonse from the fetch
    async function parse(body: string) {
      const items = [];
      const $ = load(body);

      // Check if the page has the class .page-item-detail
      $(".c-tabs-item__content").each((index, element) => {
          const item = {
            url: $(element).find(".tab-thumb > a").attr("href").trim(),
            sourceId: this.id,
            title: $(element).find(".post-title > h3 > a").text().trim(),
            thumbnail: cleanContent(
              $(element).find("img.img-responsive").attr("data-src")?.trim()
            ),
          };
          items.push(item);
        });

      return items;
    }

    try {
      const pageUrl = `${baseUrl}/?s&post_type=wp-manga&m_orderby=${filter}`;

      // Fetch the page
      const response = await fetch(pageUrl, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      // Get the body of the page
      const html = await response.text();
      const novelsFromSource = await parse(html);
      //
      // console.log("Novels from source 2", novelsFromSource);
      return novelsFromSource;
    } catch (error) {
      console.log("Failed to fetch novels: " + error.message);
      throw new Error("Failed to fetch novels: " + error.message);
    }
  }

  // List of novels to show in one page
  async findNovelsByPage(page: number): Promise<Novel[]> {
    async function parse(body: string) {
      const items = [];
      const $ = load(body);

      const doc = $(".page-item-detail");
      // console.log(doc)

      if (!doc.length) return items;

      doc.each((index, element) => {
        const url = $(element).find(".h5 > a").attr("href")?.trim();
        if (url && url.length > 0) {
          const item = {
            url,
            sourceId: this.id,
            title: $(element).find(".h5 > a").text().trim(),
            thumbnail: $(element).find("img").attr("data-src")?.trim() || "",
          };
          items.push(item);
        }
      });

      return items;
    }

    try {
      // Update with your base URL
      const web = `${this.baseUrl}/page/${page}`;
      console.log("Fetching novels from url")
      const response = await fetch(web, {
        method: "GET",
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        // },
      });
      console.log("Fetch success")
      const html = await response.text();
      const novel = await parse(html)
      return novel;
    } catch (error) {
      throw new Error("Failed to fetch novels: " + error.message);
    }
  }

  // Novel details (get details from a novel in list of novels )
  async findNovelDetails(novel: Novel) {
    try {
      const response = await fetch(`${novel.url}`);
      const html = await response.text();
      const $ = load(html);

      novel.sourceId = this.id;
      novel.title = $(".post-title > h1").text().trim();
      console.log('Novel title is:', novel.title);
      novel.thumbnail =
        $(".summary_image > a > img").attr("data-src")?.trim() || "";
      novel.description = $(".summary__content > p")
        .map((i, el) => $(el).text().trim())
        .get()
        .join("\n\n");
      novel.rating = parseFloat($(".total_votes").text().trim()) || 0;

      const authors = $(".author-content > a")
        .map((i, el) => $(el).text().trim())
        .get();
      novel.authors = authors.length ? authors : [];

      const genres = $(".genres-content > a")
        .map((i, el) => $(el).text().trim())
        .get();
      novel.category = genres.length ? genres : [];

      $(".post-content_item").each((i, el) => {
        const header = $(el).find(".summary-heading > h5").text().trim();
        const content = $(el).find(".summary-content").text().trim();

        if (header.toLowerCase() === "status") {
          novel.status = content;
        } else if (header.toLowerCase() === "alternative") {
          novel.alternateNames = content.split(",").map((name) => name.trim());
        } else if (header.toLowerCase() === "release") {
          novel.releaseYear = parseInt(content, 10);
        }
      });
      return novel;
    } catch (error) {
      console.error("Failed to fetch novel details:", error);
      throw error;
    }
  }
  // Get list of chapters from a novel
  async findChaptersByNovel(novel: Novel) {
    try {
      let items = [];

      // Fetch the novel page to get the novel ID
      const web = `${novel.url}ajax/chapters`;
      const response = await axios.post(web);
      const $ = load(response.data);

      // Iterate over each option element and extract chapter details
      $(".wp-manga-chapter").each((index, element) => {
        const chapter = {
          url: $(element).find("a").attr("href").trim(),
          title: $(element).find("a").text().trim(),
          id: parseFloat($(element).find("a").text().trim()),
          uploadDate: $(element).find("span.chapter-release-date").text().trim(),
        };
        items.unshift(chapter);
      });

      return items;
    } catch (error) {
      console.error("Failed to fetch chapters:", error);
      throw error;
    }
  }

  async findContentByChapter(chapter: any) {
    try {
      // Fetch the chapter page
      const response = await axios.get(`${chapter.url}`);
      const $ = load(response.data);

      const main = $(".reading-content").first();
      if (!main.length) {
        throw new Error("No content found for chapter");
      }

      chapter.content = "";
      chapter.content = cleanContent(
        main
          .find("p")
          .map((i, el) => $(el).text().trim())
          .get()
          .join("\n\n")
      );

      return chapter;
    } catch (error) {
      console.error("Failed to fetch chapter:", error);
      throw error;
    }
  }

  // async findNovelDetails(novel: any): Promise<any> {}
  async searchNovels(query: string): Promise<any[]> {
    let queryByNovelName = `${this.baseUrl}/?s=${query}&post_type=wp-manga`
    async function queryNovels(url) {
      try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = load(html);

        const novels = [];
        if ($(".not-found-content").length > 0) {
          return null;
        }
        $(".c-tabs-item__content").each((index, element) => {
          const item = {
            url: $(element).find(".tab-thumb > a").attr("href").trim(),
            title: $(element).find(".post-title > h3 > a").text().trim(),
            thumbnail: $(element).find("img.img-responsive").attr("data-src").trim(),
            sourceId: this.id,
          };
          novels.push(item);
        });

        return novels;
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        throw error;
      }
    }
    let novels = await queryNovels(queryByNovelName);
    return novels
  }

  async findChapterOfNovel(novelTittle: string, chapterTittle: string ){
    const novels = await this.searchNovels(novelTittle)
    console.log('Change source for novel: ', novelTittle)
    console.log("List novel:", novels)
    // Sử dụng vòng lặp for để kiểm tra
    let foundNovel = null;
    for (let novel of novels) {
        if (novel.title === novelTittle) {
            foundNovel = novel;
            break;
        }
    }
    if (foundNovel !== null){
      console.log("Chapter name: ", chapterTittle)
      const listChapter = await this.findChaptersByNovel(foundNovel)
      // console.log(listChapter)
      
      let foundChapter = null;
      for (let chapter of listChapter){
        if (chapter.title === chapterTittle){
          foundChapter = chapter;
          break;
        }
      }

      const chapterContent = await this.findContentByChapter(foundChapter)
      return chapterContent;
    }
    
    return null;
  }

}

// export default LightNovelHeaven;
