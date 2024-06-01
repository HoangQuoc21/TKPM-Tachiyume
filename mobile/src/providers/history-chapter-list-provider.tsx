import { createContext, useState, useEffect } from "react";
import Chapter from "../models/chapter";
import { getHistoryChaptersFromStorage } from "../storages/history-chapter-storage";

export const HistoryChapterListContext = createContext([]);

export function HistoryChapterListProvider({ children }) {
    const [historyChapterList, setHistoryChapterList] = useState<Chapter[]>([]);

    useEffect(() => {
        getHistoryChaptersFromStorage().then((fetchedChapters) => {
            setHistoryChapterList(fetchedChapters);
        });
    }, []);

    // useEffect(() => {
    //     console.log('--> history chapterList from storage:', historyChapterList);
    // }, [historyChapterList]);

    return (
        <HistoryChapterListContext.Provider value={[historyChapterList, setHistoryChapterList]}>
            {children}
        </HistoryChapterListContext.Provider>
    );
}