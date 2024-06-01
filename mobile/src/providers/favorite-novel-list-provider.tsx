import { createContext, useState, useEffect } from "react";
import Novel from "../models/novel";
import { getFavoriteNovelsFromStorage, saveFavoriteNovelsToStorage } from "../storages/favorite-novel-storage";
import SourceTwo from "../models/sources/source-two";

export const FavoriteNovelListContext = createContext([]);

export function FavoriteNovelListProvider({ children }) {
    const [favoriteNovelList, setFavoriteNovelList] = useState<Novel[]>([]);

    // For testing
    const setSampleFavoriteNovelList = async () => {
        const sourceTwo = new SourceTwo();
        const favoriteSampleNovels = await sourceTwo.findNovelsByPage(1);
        saveFavoriteNovelsToStorage(favoriteSampleNovels)
    }

    // For testing
    useEffect(()=>{
        setSampleFavoriteNovelList()
    }, [favoriteNovelList])

    // For testing
    useEffect(() => {
        getFavoriteNovelsFromStorage().then((fetchedNovels) => {
            setFavoriteNovelList(fetchedNovels);
        });
    }, []);

    // useEffect(() => {
    //     console.log('--> favorite novelList from storage:', favoriteNovelList);
    // }, [favoriteNovelList]);

    return (
        <FavoriteNovelListContext.Provider value={[favoriteNovelList, setFavoriteNovelList]}>
            {children}
        </FavoriteNovelListContext.Provider>
    );
}