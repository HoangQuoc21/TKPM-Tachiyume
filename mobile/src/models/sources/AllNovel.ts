import { string } from "mobx-state-tree/dist/internal";
import Chapter from "../chapter";
import Novel from "../novel";
import Source from "./source";
import { load } from "cheerio";
import { useToast } from "react-native-toast-notifications";
function cleanContent(content: string) {
  return content.replace(/\n\n/g, "\n");
}

// Source: ALL NOVEL
export default class AllNovel extends Source {

 
  static title = "All Novel";
  static importURL = "https://allnovel.org";
  static idToCreate = 1;
  constructor() {
    super();
    this.id = 1;
    this.sourceTitle = "All Novel";
    this.baseUrl = "https://allnovel.org";
    this.thumbnail =
      "https://allnovel.org/uploads/thumbs/logo-allnovel-2-1-ad7cde4de9-4a0ffbf5f789092106e8046d01d3c362.png";
    this.readLanguage = "English";
  }

  async getId(): Promise<number>{
    return this.id;
  }

  async createInstance(): Promise<Source> {
    return new AllNovel();
  }

  // Individual method of AllNovel
  async parse(body: string) {
    const items = [];
    const $ = load(body);
    const doc = $("div.col-truyen-main.archive").first();
    // console.log(doc)
    if (!doc) return items;
    const rows = doc.find("div.row").toArray();
    for (let [index, element] of rows.entries()) {
      // ES6
      //console.log(index)
      const url = $(element).find("h3.truyen-title > a").attr("href").trim();
      if (url.length > 0) {
        const item = {
          url,
          sourceId: this.id, // Assuming sourceId is defined elsewhere
          title: $(element).find("h3.truyen-title > a").text().trim(),
          thumbnail: null,
        };
        const thumbnail = $(element).find("div.col-xs-3 img").attr("src") 
        item.thumbnail = `${this.baseUrl}${thumbnail}`;
        items.push(item);
        // try {
        //   const response = await fetch(`${sourceBaseUrl}${url}`);
        //   const responseData = await response.text();
        //   const $img = load(responseData);

        //   item.thumbnail = `${sourceBaseUrl}${$img("div.books img").attr("src")}`;

        //   //console.log(item)
        //   items.push(item);
        // } catch (e) {
        //   throw e;
        // }
      }
    }
    return items;
  }


  async findNovelsByFilter(filter: string, page: number): Promise<any[]> {
    switch (filter) {
      case "filterNovels.popular":
        filter = "most-popular";
        break;
      case "filterNovels.trending":
        filter = "hot-novel";
        break;
      case "filterNovels.latest":
        filter = "latest-release-novel";
        break;
      case "filterNovels.completed":
        filter = "completed-novel";
        break;
      default:
        filter = "most-popular";
        break;
    }

    const sourceId = this.id;
    const sourceBaseUrl = this.baseUrl;

    

    try {
      // Update with your base URL
      const web = `${sourceBaseUrl}/${filter}?page=${page}`;
      const response = await fetch(web, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const html = await response.text();
      const data = await this.parse(html);
      return data;
    } catch (error) {
      throw new Error("Failed to fetch novels: " + error.message);
    }

  }

  // List of novels to show in one page
  async findNovelsByPage(page: number): Promise<any[]> {
    const sourceId = this.id;
    const sourceBaseUrl = this.baseUrl;

    try {
      // Update with your base URL
      const web = `${sourceBaseUrl}/most-popular?page=${page}`;
      const response = await fetch(web, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const html = await response.text();
      const data = await this.parse(html);
      return data;
    } catch (error) {
      throw new Error("Failed to fetch novels: " + error.message);
    }
  }

  // Novel details (get details from a novel in list of novels )
  async findNovelDetails(novel: Novel) {
    try {
      const response = await fetch(`${this.baseUrl}${novel.url}`);
      const html = await response.text();
      const $ = load(html);

      novel.sourceId = this.id; // Assuming `sourceId` is defined elsewhere in your code.
      novel.title = $("div.books h3.title").text().trim();
      novel.thumbnail = this.baseUrl + `${$("div.books img").attr("src").trim()}`;
      novel.description = $("div.desc-text > p").text().trim();
      const lastestChapters = [];
      const chapterWrapHTML = $(".l-chapter .l-chapters");
      const chapterListHTML = chapterWrapHTML.find("li");
      chapterListHTML.each((index, element) => {
        let chapter = {
          url: $(element).find("a").attr("href"),
          name: $(element).find("a").attr("title"),
          id: null,
        };
        lastestChapters.push(chapter);
      });
      novel.lastestChapters = lastestChapters;
      $("div.info").each((index, element) => {
        const el = $(element);

        novel.authors = el
          .find("div:eq(0) > a")
          .text()
          .split(",")
          .map((author) => author.trim());
        const category = [];
        el.find("div:eq(2) > a").each((idx, a) => {
          category.push($(a).text());
        });
        novel.category = category;
        novel.status = el.find("div:eq(4) > a").text();
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
      let response = await fetch(`${this.baseUrl}${novel.url}`);
      let html = await response.text();
      let $ = load(html);
      let id = $("div#rating").attr("data-novel-id");

      // Construct the URL to fetch chapters data
      let chaptersUrl = `${this.baseUrl}/ajax-chapter-option?novelId=${id}`;
      response = await fetch(chaptersUrl);
      html = await response.text();
      $ = load(html);

      // Iterate over each option element and extract chapter details
      $("select option").each((index, element) => {
        let chapter = {
          url: $(element).attr("value").trim(),
          title: $(element).text().trim(),
          id: parseFloat($(element).text().trim()), // Assuming the name contains a float number
        };
        items.push(chapter);
      });

      return items;
    } catch (error) {
      console.error("Failed to fetch chapters:", error);
      throw error;
    }
  }

  // Get content from a chapter
  async findContentByChapter(chapter: Chapter) {
    try {
      // Fetch the chapter page
      const response = await fetch(`${this.baseUrl}${chapter.url}`);
      const html = await response.text();
      const $ = load(html);
      // Update the chapter URL to the absolute URL
      chapter.url = `${this.baseUrl}${chapter.url}`;
      chapter.content = "";
      // Remove all script tags within `div.chapter-c`
      $("div.chapter-c script").remove();
      // Select paragraphs in 'div.chapter-c', append '::' to each, then replace '::' with '\n\n'
      $("div.chapter-c p").append("::");
      chapter.content = cleanContent(
        $("div.chapter-c").text().replaceAll("::", "\n\n").trim()
      );
      return chapter;
    } catch (error) {
      console.error("Failed to fetch chapter:", error);
      throw error;
    }
  }
  async searchNovels(query: string) {
    const queryByKeyword: string = query;
    const toTitleCase = (str: string) => {
      return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
    }
    const queryByGenre: string = toTitleCase(query);
    try {
      const responseByKeyword = await fetch(`${this.baseUrl}/search?keyword=${queryByKeyword}`);
      let html = await responseByKeyword.text();
      const novelListByKeyword = await this.parse(html);
      const responseByGenre = await fetch(`${this.baseUrl}/genre/${queryByGenre}`);
      html = await responseByGenre.text();
      const novelListByGenre = await this.parse(html);
      // Combine two lists the return to client
      const data = novelListByKeyword.concat(novelListByGenre)
      return data;
      
    } catch(error) {
      console.error("Failed to fetch chapter:", error);
      throw error;
    }
  }
  
  async findChapterOfNovel(novelTittle: string, chapterTittle: string ){
    const novels = await this.searchNovels(novelTittle)
    const toast = useToast();
    console.log('Change source for novel: ', novelTittle)
    console.log("List novel:", novels)
    // Sử dụng vòng lặp for để kiểm tra
    let foundNovel = null;
    if (novels.length === 0) {
      toast.show("No novel found");
      return null;
    }
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
        if (chapter.title.includes(chapterTittle) || chapterTittle.includes(chapter.title)) {
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
