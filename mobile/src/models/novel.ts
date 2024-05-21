// Source Novel Class
import Chapter from "./chapter"

class Novel {
    //  Properties
    id: number
    title: string
    thumbnail: string
    sourceId: number
    author: string
    state: string
    category: number[]
    description: string
    view: number
    lastestChapter: Chapter
    chapterList: Chapter[]
}

export default Novel;