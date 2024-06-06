import { createContext, useState, useEffect } from 'react';
import Source from '../models/sources/source';
import { getSources, addSource, removeSource, clearSources } from '../storages/novel-sources-storage';

export const NovelSourceListContext = createContext([]);

export function NovelSourceListProvider({ children }) {
    const [sourceList, setSourceList] = useState<Source[]>([]);

    const getSourcesFromStorage = async () => {
        const fetchedSources = await getSources();
        setSourceList(fetchedSources);
    }

    const addSourceToStorage = async (source: Source) => {
        const newSourceList = [...sourceList, source];
        setSourceList(newSourceList);
        await addSource(source);
    }

    const removeSourceFromStorage = async (source: Source) => {
        const newSourceList = sourceList.filter(s => s.id !== source.id);
        setSourceList(newSourceList);
        await removeSource(source);
    }

    const clearSourcesFromStorage = async () => {
        setSourceList([]);
        await clearSources();
    }

    useEffect(() => {
       getSourcesFromStorage();
    }, []);

    useEffect(() => {
        console.log('--> sourceList number from storage:', sourceList.length);
    }, [sourceList]);

    return (
        <NovelSourceListContext.Provider value={[sourceList, addSourceToStorage, removeSourceFromStorage, clearSourcesFromStorage]}>
            {children}
        </NovelSourceListContext.Provider>
    );
}