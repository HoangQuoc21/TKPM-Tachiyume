import { createContext, useState, useEffect } from 'react';
import Source from '../models/sources/source';
import { getSourcesFromStorage } from '../storages/novel-sources-storage';

export const NovelSourceListContext = createContext([]);

export function NovelSourceListProvider({ children }) {
    const [sourceList, setSourceList] = useState<Source[]>([]);

    useEffect(() => {
        getSourcesFromStorage().then(fetchedSources => {
            setSourceList(fetchedSources);
        });
        //console.log('--> sourceList from storage:', sourceList);
    }, []);

    return (
        <NovelSourceListContext.Provider value={[sourceList, setSourceList]}>
            {children}
        </NovelSourceListContext.Provider>
    );
}