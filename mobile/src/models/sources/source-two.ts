import Source from "./source";
import { load } from "cheerio";
import axios from "axios";
import Novel from "../novel";
import Chapter from "../chapter";

function cleanContent(content: string) {
  return content.replace(/\n\n/g, "\n");
}

function getSummaryImage($) {
  const imgElement = $(".summary_image > a > img");
  const imgUrl = imgElement.attr("data-src").trim();
  return imgUrl;
}

// export const SourceTwoImportURL = "https://boxnovel.com";

// Source: Box novel
export default class SourceTwo extends Source {
  findNovelDetails(novel: Novel): Promise<any> {
    throw new Error("Method not implemented.");
  }
  static title = "Box Novel";
  static importURL = "https://boxnovel.com";

  constructor() {
    super();
    this.id = 2;
    this.sourceTitle = "Box Novel";
    this.baseUrl = "https://boxnovel.com/";
    this.thumbnail ="https://boxnovel.com/wp-content/uploads/2018/04/box-icon-250x250.png";
    this.readLanguage = "English";
  }
  // List of novels to show in one page
  async findNovelsByPage(page: number): Promise<any[]> {
    const sourceId = this.id;
    const baseUrl = this.baseUrl;

    // function to parse the body reposonse from the fetch
    async function parse(body: string) {
      const items = [];
      const $ = load(body);

      // Check if the page has the class .page-item-detail
      $(".page-item-detail").each((index, element) => {
        // Get the url of the novel (right after the h5 tag)
        const url = $(element).find(".h5 > a").attr("href")?.trim() || "";
        // If that url is not empty, then we can get the name and cover
        if (url.length > 0) {
          const item = {
            url: url,
            sourceId: sourceId,
            name: $(element).find(".h5 > a").text().trim(),
            cover: cleanContent(
              $(element).find("img").attr("data-src")?.trim() || ""
            ),
          };
          items.push(item);
        }
      });

      return items;
    }

    try {
      const pageUrl = `${baseUrl}/page/${page}`;

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
      console.log("Novels from source 2", novelsFromSource);
      return novelsFromSource;
    } catch (error) {
      console.log("Failed to fetch novels: " + error.message);
      throw new Error("Failed to fetch novels: " + error.message);
    }
  }

  // Novel details (get details from a novel in list of novels )
  async findNovelsDetail(novel: Novel) {
    try {
      // fetch the detail page of the novel
      const reponse = await fetch(`${this.baseUrl}${novel.url}`);
      const html = await reponse.text();
      const $ = load(html);

      // Get the details of the novel
      novel.id = 1; //assuming the id is 1

      novel.sourceId = this.id;
      novel.title = $("post-title > h1").text().trim();
      novel.thumbnail = getSummaryImage($);
      novel.description = $("div.summary__content")
        .text()
        .replace(/\n/g, "\n\n")
        .trim();
      novel.rating = parseFloat($(".total_votes").text().trim());
      novel.authors = $(".author-content > a")
        .map((i, el) => $(el).text().trim())
        .get();

      novel.view = 1000; // Assuming the view count is 1000

      const genres = [];
      $(".genres-content > a").each((i, el) => {
        genres.push($(el).text().trim());
      });
      novel.category = genres;

      //Find the status
      $(".post-content_item").each((i, el) => {
        const header = $(el).find(".summary-heading > h5").text().trim();
        const content = $(el).find(".summary-content").text().trim();

        if (header.toLowerCase() === "status") {
          novel.status = content;
        }
      });

      return novel;
    } catch (error) {
      throw new Error("Failed to get novel detail: " + error.message);
    }
  }
  // Get list of chapters from a novel
  async findChaptersByNovel(novel: Novel) {
    try {
      const chapters = [];
      const web = `${novel.url}ajax/chapters`;
      const response = await axios.post(web);
      const html = response.data;
      const $ = load(html);

      $(".wp-manga-chapter").each((index, element) => {
        const item = {
          url: $(element).find("a").attr("href").trim(),
          title: $(element).find("a").text().trim(),
          id: parseFloat($(element).find("a").text().trim()), // Assuming the chapter name is a number
          uploadDate: $(element)
            .find("span.chapter-release-date")
            .text()
            .trim(),
        };
        chapters.push(item);
      });

      return chapters;
    } catch (error) {
      console.log("Failed to fetch chapters:", error);
      throw error;
    }
  }

  async findContentByChapter(chapter: Chapter) {
    try {
      const response = await axios.get(chapter.url);
      const html = response.data;
      const $ = load(html);
      const main = $(".reading-content").first();

      if (!main.length) {
        return null;
      }

      chapter.content = main
        .find("p")
        .map((i, el) => $(el).text().trim())
        .get()
        .join("\n\n");
      return chapter;

    } catch (error) {
      console.error("Failed to fetch chapter:", error);
      throw error;
    }
  }
}