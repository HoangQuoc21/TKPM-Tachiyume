import Novel from "../models/novel";
import Chapter from "../models/chapter";

export type HistoryChapterListSaveType = { chapter: Chapter, novel: Novel, source: any };