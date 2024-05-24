import SourceInterface from "./SourceInterface";
import {load} from 'cheerio'
const sourceId = 2;
const baseUrl = 'https://boxnovel.com/';

function cleanContent(content: string) {
    return content.replace(/\n\n/g, "\n");
}

class SourceTwo implements SourceInterface {
    sourceTitle: string = 'BoxNovel';
    thumbnail: string;
    readLanguage: string = 'English';
   
    //public List<Novel> novels(int page) throws IOException {
        // List<Novel> items = new ArrayList<>();
        // String web = baseUrl.concat("/page/").concat(String.valueOf(page));
        // Element doc = Jsoup.parse(HttpClient.GET(web, new HashMap<>()));

        // for (Element element : doc.select(".page-item-detail")) {
        //     String url = element.select(".h5 > a").attr("href").trim();

        //     if (url.length() > 0) {
        //         Novel item = new Novel(url);
        //         item.sourceId = sourceId;
        //         item.name = element.select(".h5 > a").text().trim();
        //         item.cover = cleanImg(element.select("img").attr("data-src").trim());
        //         items.add(item);
        //     }
        // };;

        // return items;
    //}

    // List of novels to show in on page
    async findNovelsByPage(page: number): Promise<any[]> {
        const pageUrl = `${baseUrl}/page/${page}`;
        
        const $ = load(pageUrl);

        return null;
    }
    // Novel details (get details from a novel in list of novels )
    async findNovelsDetail(novel: any): Promise<any> {
        return null;
    }
    // Get list of chapters from a novel
    async findChaptersByNovel(novel: any): Promise<any[]> {
        return null;
    }
    
    async findContentByChapter(chapter: any): Promise<any> {
        return null
    }
}
export default SourceTwo;