import SourceInterface from "./SourceInterface";
import {load} from 'cheerio'
const sourceId = 1;
const baseUrl = 'https://allnovel.org'; // Source: ALL NOVEL
function cleanContent(content: string) {
    return content.replace(/\n\n/g, "\n");
}

class SourceOne implements SourceInterface {
    sourceTitle: string = 'AllNovel';
    thumbnail: string;
    readLanguage: string = 'English';
    // List of novels to show in one page
    async findNovelsByPage(page: number): Promise<any[]> {
        async function parse(body: string) {
            const items = [];
            const $ = load(body)

            const doc = $('div.col-truyen-main.archive').first();
            // console.log(doc)
            if (!doc) return items;
            const rows = doc.find('div.row').toArray();
            for (let [index, element] of rows.entries()) { // ES6
                //console.log(index)
                const url = $(element).find('h3.truyen-title > a').attr('href').trim();
                if (url.length > 0) {
                    const item = {
                        url,
                        sourceId: sourceId, // Assuming sourceId is defined elsewhere
                        name: $(element).find('h3.truyen-title > a').text().trim(),
                        cover: null,
                    };
                    try {
                        const response = await fetch(`${baseUrl}${url}`);
                        const responseData = await response.text();
                        const $img = load(responseData);

                        item.cover = `${baseUrl}${$img('div.books img').attr('src')}`;
                        //console.log(item)
                        items.push(item);
                    } catch (e) {
                        throw e
                    }

                }
            }

            return items;
        }

        try {
            // Update with your base URL
            const web = `${baseUrl}/most-popular?page=${page}`;
            const response = await fetch(web, {
                method: 'GET',
                headers: {

                    'Access-Control-Allow-Origin': '*',
                }
            });
            const html = await response.text();
            const data = await parse(html);
            return data;

        } catch (error) {
            throw new Error('Failed to fetch novels: ' + error.message);
        }
    }

    // Novel details (get details from a novel in list of novels )
    async findNovelsDetail(novel: any) {
        try {
            const response = await fetch(`${baseUrl}${novel.url}`);
            const html = await response.text();
            const $ = load(html);

            novel.sourceId = sourceId; // Assuming `sourceId` is defined elsewhere in your code.
            novel.name = $("div.books h3.title").text().trim();
            novel.cover = `${baseUrl}${$("div.books img").attr("src").trim()}`;
            novel.summary = $("div.desc-text > p").text().trim();
            novel.rating = parseFloat($("input#rateVal").attr("value")) / 2;

            $("div.info").each((index, element) => {
                const el = $(element);

                novel.authors = el.find("div:eq(0) > a").text().split(",").map(author => author.trim());
                const genres = [];
                el.find("div:eq(2) > a").each((idx, a) => {
                    genres.push($(a).text());
                });
                novel.genres = genres;
                novel.status = el.find("div:eq(4) > a").text();
            });

            return novel;
        } catch (error) {
            console.error('Failed to fetch novel details:', error);
            throw error;
        }
    }
    // Get list of chapters from a novel
    async findChaptersByNovel(novel: any) {
        try {
            let items = [];

            // Fetch the novel page to get the novel ID
            let response = await fetch(`${baseUrl}${novel.url}`);
            let html = await response.text();
            let $ = load(html);
            let id = $('div#rating').attr('data-novel-id');

            // Construct the URL to fetch chapters data
            let chaptersUrl = `${baseUrl}/ajax-chapter-option?novelId=${id}`;
            response = await fetch(chaptersUrl);
            html = await response.text();
            $ = load(html);

            // Iterate over each option element and extract chapter details
            $('select option').each((index, element) => {
                let chapter = {
                    url: $(element).attr('value').trim(),
                    name: $(element).text().trim(),
                    id: parseFloat($(element).text().trim()), // Assuming the name contains a float number
                };
                items.push(chapter);
            });

            return items;
        } catch (error) {
            console.error('Failed to fetch chapters:', error);
            throw error;
        }
    }
 

    async findContentByChapter(chapter: any) {
        try {
            // Fetch the chapter page
            const response = await fetch(`${baseUrl}${chapter.url}`);
            const html = await response.text();
            const $ = load(html);

            // Update the chapter URL to the absolute URL
            chapter.url = `${baseUrl}${chapter.url}`;
            chapter.content = "";
            // Remove all script tags within `div.chapter-c`
            $('div.chapter-c script').remove();
            // Select paragraphs in 'div.chapter-c', append '::' to each, then replace '::' with '\n\n'
            $('div.chapter-c p').append('::');
            chapter.content = cleanContent($('div.chapter-c').text().replaceAll('::', '\n\n').trim());

            return chapter;
        } catch (error) {
            console.error('Failed to fetch chapter:', error);
            throw error;
        }
    }

    
}

export default SourceOne;