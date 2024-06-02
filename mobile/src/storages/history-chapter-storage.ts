import AsyncStorage from "@react-native-async-storage/async-storage";
import Novel from "../models/novel";
import Chapter from "../models/chapter";

const HISTORY_CHAPTER_KEY = "history_chapters";

// Save the type consist of Chapter ,Novel and Source object
type HistoryChapterType = { chapter: Chapter, novel: Novel, source: any };

export const getHistoryChapters = async (): Promise<HistoryChapterType[]> => {
    const chapters = await AsyncStorage.getItem(HISTORY_CHAPTER_KEY);
    const result = chapters ? JSON.parse(chapters) : [];
    return result.reverse();
};

export const saveHistoryChapters = async (chapters: HistoryChapterType[]): Promise<void> => {
    await AsyncStorage.setItem(HISTORY_CHAPTER_KEY, JSON.stringify(chapters));
};

export const addHistoryChapter = async (chapter: Chapter, novel: Novel, source: any): Promise<boolean> => {
    const chapters = await getHistoryChapters();

    // Check if the chapter is already in the list, if so, return false
    const index = chapters.findIndex((c) => c.chapter.id === chapter.id);
    if (index !== -1) {
        return false;
    }

    //Check if the the chapter list is more than 20, if so, remove the first one
    if (chapters.length >= 20) {
        chapters.unshift();
    }

    chapters.push({chapter, novel, source});
    await saveHistoryChapters(chapters);
    return true;
};

export const removeHistoryChapter = async (chapter: Chapter): Promise<void> => {
    const chapters = await getHistoryChapters();
    const index = chapters.findIndex((c) => c.chapter.id === chapter.id);
    if (index !== -1) {
        chapters.splice(index, 1);
        await saveHistoryChapters(chapters);
    }
};

export const clearHistoryChapters = async (): Promise<void> => {
    await AsyncStorage.removeItem(HISTORY_CHAPTER_KEY);
};