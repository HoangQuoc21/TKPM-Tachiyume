import { createContext, useState, useEffect } from "react";
import Chapter from "../models/chapter";
import Novel from "../models/novel";
import { getHistoryChapters, addHistoryChapter, removeHistoryChapter, clearHistoryChapters } from "../storages/history-chapter-storage";

export const HistoryChapterListContext = createContext([]);

// Save the type consist of Chapter ,Novel and Source object
type HistoryChapterType = { chapter: Chapter, novel: Novel, source: any };

export function HistoryChapterListProvider({ children }) {
    const [historyChapterList, setHistoryChapterList] = useState<HistoryChapterType[]>([]);

    const getHistoryChaptersFromStorage = async () => {
        const fetchedChapters = await getHistoryChapters();
        setHistoryChapterList(fetchedChapters);
    }

    const addHistoryChapterToStorage = async (chapter: Chapter, novel: Novel, source: any) => {
        const newChapterList = [...historyChapterList, {chapter, novel, source}];
        setHistoryChapterList(newChapterList);
        await addHistoryChapter(chapter, novel, source);
    }

    const removeHistoryChapterFromStorage = async (chapter: Chapter) => {
        const newChapterList = historyChapterList.filter(c => c.chapter.id !== chapter.id);
        setHistoryChapterList(newChapterList);
        await removeHistoryChapter(chapter);
    }

    const clearHistoryChaptersFromStorage = async () => {
        setHistoryChapterList([]);
        await clearHistoryChapters();
    }

    useEffect(() => {
        getHistoryChaptersFromStorage();
    }, []);

    useEffect(() => {
        console.log('--> history chapterList from storage:', historyChapterList);
    }, [historyChapterList]);

    return (
        <HistoryChapterListContext.Provider value={[historyChapterList, addHistoryChapterToStorage, removeHistoryChapter, clearHistoryChapters]}>
            {children}
        </HistoryChapterListContext.Provider>
    );
}