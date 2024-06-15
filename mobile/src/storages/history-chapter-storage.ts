import AsyncStorage from "@react-native-async-storage/async-storage";
import Novel from "../models/novel";
import Chapter from "../models/chapter";

// import the save type
import { HistoryChapterListSaveType } from "../types";

const HISTORY_CHAPTER_KEY = "history_chapters";


export const getHistoryChapters = async (): Promise<HistoryChapterListSaveType[]> => {
    const chapters = await AsyncStorage.getItem(HISTORY_CHAPTER_KEY);
    const result = chapters ? JSON.parse(chapters) : [];
    return result.reverse();
};

export const saveHistoryChapters = async (chapters: HistoryChapterListSaveType[]): Promise<void> => {
    await AsyncStorage.setItem(HISTORY_CHAPTER_KEY, JSON.stringify(chapters));
};

export const addHistoryChapter = async (chapter: Chapter, novel: Novel, source: any): Promise<void> => {
    const chapters = await getHistoryChapters();
    chapters.push({chapter, novel, source});
    await saveHistoryChapters(chapters);
};

export const removeHistoryChapter = async (chapter: Chapter): Promise<void> => {
    const chapters = await getHistoryChapters();
    for(let i = 0; i < chapters.length; i++) {
        if(chapters[i].chapter.id === chapter.id) {
            chapters.splice(i, 1);
            break;
        }
    }
    await saveHistoryChapters(chapters);
};

export const clearHistoryChapters = async (): Promise<void> => {
    await AsyncStorage.removeItem(HISTORY_CHAPTER_KEY);
};