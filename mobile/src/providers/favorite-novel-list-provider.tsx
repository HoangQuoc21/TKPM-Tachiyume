import { createContext, useState, useEffect } from "react";
import Novel from "../models/novel";
import { getFavoriteNovels, addFavoriteNovel, removeFavoriteNovel, clearFavoriteNovelsInStorage } from "../storages/favorite-novel-storage";

export const FavoriteNovelListContext = createContext([]);

// Save the type consist of Novel and Source object
type FavoriteNovelType = { novel: Novel, source: any };

export function FavoriteNovelListProvider({ children }) {
    const [favoriteNovelList, setFavoriteNovelList] = useState<FavoriteNovelType[]>([]);

    const getFavoriteNovelsFromStorage = async () => {
        const fetchedNovels = await getFavoriteNovels();
        setFavoriteNovelList(fetchedNovels);
    }

    const addFavoriteNovelToStorage = async (novel: Novel, source: any) => {
        const newNovelList = [...favoriteNovelList, {novel, source}];
        setFavoriteNovelList(newNovelList);
        await addFavoriteNovel(novel, source);
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
        console.log('--> favorite novelList from storage:', favoriteNovelList);
    }, [favoriteNovelList]);

    return (
        <FavoriteNovelListContext.Provider value={[favoriteNovelList, addFavoriteNovelToStorage]}>
            {children}
        </FavoriteNovelListContext.Provider>
    );
}