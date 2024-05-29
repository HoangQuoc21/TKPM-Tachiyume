import Source from "./source";
import { load } from "cheerio";
import axios from "axios";
import Novel from "../novel";

function cleanContent(content: string) {
  return content.replace(/\n\n/g, "\n");
}

export default class SourceThree extends Source {
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
            name: $(element).find(".h5 > a").text().trim(),
            cover: $(element).find("img").attr("data-src")?.trim() || "",
          };
          items.push(item);
        }
      });

      return items;
    }

    try {
      // Update with your base URL
      const web = `${this.baseUrl}/page/${page}`;
      const response = await axios.get(web, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await parse(response.data);
      return data;
    } catch (error) {
      throw new Error("Failed to fetch novels: " + error.message);
    }
  }

  // Novel details (get details from a novel in list of novels )
  async findNovelsDetail(novel: Novel) {
    try {
      const response = await axios.get(`${novel.url}`);
      const $ = load(response.data);

      novel.sourceId = this.id;
      novel.title = $(".post-title > h1").text().trim();
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
  async findChaptersByNovel(novel: any) {
    try {
      let items = [];

      // Fetch the novel page to get the novel ID
      const web = `${novel.url}ajax/chapters`;
      const response = await axios.get(web);
      const $ = load(response.data);

      // Iterate over each option element and extract chapter details
      $(".wp-manga-chapter").each((index, element) => {
        const chapter = {
          url: $(element).find("a").attr("href")?.trim() || "",
          name: $(element).find("a").text().trim(),
          id: parseFloat($(element).find("a").text().trim()) || 0,
          updated: $(element).find("span.chapter-release-date").text().trim(),
        };
        items.push(chapter);
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

  async findNovelDetails(novel: any): Promise<any> {}
}

// export default SourceThree;
