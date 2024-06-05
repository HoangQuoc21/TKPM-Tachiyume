import { createContext, useState, useEffect } from "react";
import Chapter from "../models/chapter";
import Novel from "../models/novel";
import { getHistoryChapters, addHistoryChapter, removeHistoryChapter, clearHistoryChapters } from "../storages/history-chapter-storage";
// import the save type
import { HistoryChapterListSaveType } from "../types";

export const HistoryChapterListContext = createContext([]);

export function HistoryChapterListProvider({ children }) {
    const [historyChapterList, setHistoryChapterList] = useState<HistoryChapterListSaveType[]>([]);

    const getHistoryChaptersFromStorage = async () => {
        const fetchedChapters = await getHistoryChapters();
        setHistoryChapterList(fetchedChapters);
    }

    const addHistoryChapterToStorage = async (chapter: Chapter, novel: Novel, source: any) => {
        //Check if history chapter list length is 20, if so, remove the first element of both list and storage
        if (historyChapterList.length >= 20) {
            const newChapterList = historyChapterList.slice(1);
            setHistoryChapterList(newChapterList);
            await removeHistoryChapter(historyChapterList[0].chapter);
        }
        
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
        console.log('--> history chapterList number from storage:', historyChapterList.length);
    }, [historyChapterList]);

    return (
        <HistoryChapterListContext.Provider value={[historyChapterList, addHistoryChapterToStorage]}>
            {children}
        </HistoryChapterListContext.Provider>
    );
}