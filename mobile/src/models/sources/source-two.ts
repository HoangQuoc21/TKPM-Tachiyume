import Source from "./source";
import { load } from "cheerio";

function cleanContent(content: string) {
  return content.replace(/\n\n/g, "\n");
}

// Source: Box novel
class SourceTwo extends Source {
  constructor() {
    super();
    this.id = 2;
    this.baseUrl = "https://boxnovel.com/";
    this.sourceTitle = "BoxNovel";
    this.thumbnail =
      "https://boxnovel.com/wp-content/uploads/2018/04/box-icon-250x250.png";
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
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
        }


    });
      // Get the body of the page
      const html = await response.text();
      const novelsFromSource = await parse(html);
      // 
      console.log('Novels from source 2', novelsFromSource);
      return novelsFromSource;


    } catch (error) {
      console.log('Failed to fetch novels: ' + error.message); 
      throw new Error('Failed to fetch novels: ' + error.message);
    }


  }

  // Novel details (get details from a novel in list of novels )
  async findNovelsDetail(novel: any) {
    try {
      // fetch the detail page of the novel
      const reponse = await fetch(`${this.baseUrl}${novel.url}`);
      const html = await reponse.text();
      const $ = load(html);

      // Get the details of the novel
      novel.id = this.id;
      novel.title = $("post-title > h1").text().trim();
      


    } catch (error) {
      throw new Error('Failed to get novel detail: ' + error.message);
    }
  }
  // Get list of chapters from a novel
  async findChaptersByNovel(novel: any) {
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
          name: $(element).text().trim(),
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

  async findContentByChapter(chapter: any) {
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
}

export default SourceTwo;
