import { createContext, useState, useEffect } from "react";
import Novel from "../models/novel";
import { getFavoriteNovels, addFavoriteNovel, removeFavoriteNovel, clearFavoriteNovelsInStorage } from "../storages/favorite-novel-storage";

//import the save type
import { FavoriteNovelSaveType } from "../types";

export const FavoriteNovelListContext = createContext([]);

export function FavoriteNovelListProvider({ children }) {
    const [favoriteNovelList, setFavoriteNovelList] = useState<FavoriteNovelSaveType[]>([]);

    const getFavoriteNovelsFromStorage = async () => {
        const fetchedNovels = await getFavoriteNovels();
        setFavoriteNovelList(fetchedNovels.reverse());
    }

    const addFavoriteNovelToStorage = async (novel: Novel, source: any) => {
        //Check if novel is already in the list, if so, return false
        for (let i = 0; i < favoriteNovelList.length; i++) {
            if (favoriteNovelList[i].novel.title === novel.title) {
                return false;
            }
        }

        //Check if favorite novel list length is 20, if so, remove the first element of both list and storage
        if (favoriteNovelList.length >= 20) {
            const newNovelList = favoriteNovelList.slice(1);
            setFavoriteNovelList(newNovelList);
            await removeFavoriteNovel(favoriteNovelList[0].novel);
        }

        //Add the new novel to the list and storage
        const newNovelList = [...favoriteNovelList, {novel, source}];
        setFavoriteNovelList(newNovelList);
        addFavoriteNovel(novel, source);
        return true;
    }

    const removeFavoriteNovelFromStorage = async (novel: Novel) => {
        const newNovelList = favoriteNovelList.filter(n => n.novel.title !== novel.title);
        setFavoriteNovelList(newNovelList);
        await removeFavoriteNovel(novel);
    }

    const clearFavoriteNovelsFromStorage = async () => {
        setFavoriteNovelList([]);
        await clearFavoriteNovelsInStorage();
    }

    useEffect(() => {
        getFavoriteNovelsFromStorage();
    }, []);

    useEffect(() => {
        console.log('--> favorite novelList number from storage:', favoriteNovelList.length);
    }, [favoriteNovelList]);

    return (
        <FavoriteNovelListContext.Provider value={[favoriteNovelList, addFavoriteNovelToStorage, removeFavoriteNovelFromStorage]}>
            {children}
        </FavoriteNovelListContext.Provider>
    );
}