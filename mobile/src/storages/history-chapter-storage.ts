import AsyncStorage from "@react-native-async-storage/async-storage";
import Chapter from "../models/chapter";

const HISTORY_CHAPTER_KEY = "history_chapters";

export const getHistoryChaptersFromStorage = async (): Promise<Chapter[]> => {
    const chapters = await AsyncStorage.getItem(HISTORY_CHAPTER_KEY);
    const result = chapters ? JSON.parse(chapters) : [];
    return result.reverse();
};

export const saveHistoryChaptersToStorage = async (chapters: Chapter[]): Promise<void> => {
    await AsyncStorage.setItem(HISTORY_CHAPTER_KEY, JSON.stringify(chapters));
};

export const addHistoryChapterToStorage = async (chapter: Chapter): Promise<boolean> => {
    const chapters = await getHistoryChaptersFromStorage();

    // Check if the chapter is already in the list, if so, return false
    const index = chapters.findIndex((c) => c.id === chapter.id);
    if (index !== -1) {
        return false;
    }

    //Check if the the chapter list is more than 20, if so, remove the first one
    if (chapters.length >= 20) {
        chapters.unshift();
    }

    chapters.push(chapter);
    await saveHistoryChaptersToStorage(chapters);
    return true;
};

export const removeHistoryChapterFromStorage = async (chapter: Chapter): Promise<void> => {
    const chapters = await getHistoryChaptersFromStorage();
    const index = chapters.findIndex((c) => c.id === chapter.id);
    if (index !== -1) {
        chapters.splice(index, 1);
        await saveHistoryChaptersToStorage(chapters);
    }
};