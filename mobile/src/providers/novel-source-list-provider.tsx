import { createContext, useState } from 'react';
import Source from '../models/sources/source';

export const NovelSourceListContext = createContext([]);

export function NovelSourceListProvider({ children }) {
    const [sourceList, setSourceList] = useState<Source[]>([]);

    return (
        <NovelSourceListContext.Provider value={[sourceList, setSourceList]}>
            {children}
        </NovelSourceListContext.Provider>
    );
}