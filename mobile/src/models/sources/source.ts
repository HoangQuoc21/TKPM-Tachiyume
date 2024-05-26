// Novel Source abstract class

abstract class Source {
    static importURL: string;
    // Properties
    id: number 
    baseUrl: string
    sourceTitle: string
    thumbnail: string
    readLanguage: string

    // Methods:
    // Constructor
    constructor() {
        this.id = 0;
        this.baseUrl = '';
        this.sourceTitle = '';
        this.thumbnail = '';
        this.readLanguage = '';
    }

    // List of novels to show in on page
    abstract findNovelsByPage(page: number): Promise<any[]>
    // Novel details (get details from a novel in list of novels )
    abstract findNovelDetails(novel: any): Promise<any>
    // Get list of chapters from a novel
    abstract findChaptersByNovel(novel: any): Promise<any[]>
    // Get content from a chapter
    abstract findContentByChapter(chapter: any): Promise<any>
}

export default Source;