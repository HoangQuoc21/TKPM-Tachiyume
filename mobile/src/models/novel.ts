// Source Novel Class
import Chapter from "./chapter"

class Novel {
    //  Properties
    url: string // url to the novel
    id: number
    title: string
    thumbnail: string
    sourceId: number
    authors: string[] //Update the type of authors to string[] as there might be many authors
    state: string
    category: number[]
    description: string
    view: number
    lastestChapter: Chapter
    chapterList: Chapter[]
}

export default Novel;