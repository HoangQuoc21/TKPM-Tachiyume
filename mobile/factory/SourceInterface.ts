const sourceId: number = 1;
const baseUrl: string = 'https://allnovel.org';
interface SourceInterface {
    sourceTitle: string
    thumbnail: string
    readLanguage: string
// List of novels to show in on page
    findNovelsByPage(page: number): Promise<any[]>
// Novel details (get details from a novel in list of novels )
    findNovelsDetail(novel: any): Promise<any>
// Get list of chapters from a novel
    findChaptersByNovel(novel: any): Promise<any[]>
    
    findContentByChapter(chapter: any): Promise<any>
}

export default SourceInterface;