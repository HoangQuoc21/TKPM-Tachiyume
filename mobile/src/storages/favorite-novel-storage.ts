import AsyncStorage from "@react-native-async-storage/async-storage";
import Novel from "../models/novel";

//import the save type
import { FavoriteNovelSaveType } from "../types";

const FAVORITE_NOVEL_KEY = "favorite_novels"

export const getFavoriteNovels = async (): Promise<FavoriteNovelSaveType[]> => {
    const novels = await AsyncStorage.getItem(FAVORITE_NOVEL_KEY);
    const result = novels ? JSON.parse(novels) : [];
    return result.reverse();
};

export const saveFavoriteNovels = async (novels: FavoriteNovelSaveType[]): Promise<void> => {
    await AsyncStorage.setItem(FAVORITE_NOVEL_KEY, JSON.stringify(novels));
};

export const addFavoriteNovel = async (novel: Novel, source: any): Promise<void> => {
    const novels = await getFavoriteNovels();
    novels.push({novel, source});
    await saveFavoriteNovels(novels);
};

export const removeFavoriteNovel = async (novel: Novel): Promise<void> => {
    const novels = await getFavoriteNovels();
    for(let i = 0; i < novels.length; i++) {
        if(novels[i].novel.title === novel.title) {
            novels.splice(i, 1);
            break;
        }
    }
    await saveFavoriteNovels(novels);
};

export const clearFavoriteNovelsInStorage = async (): Promise<void> => {
    await AsyncStorage.removeItem(FAVORITE_NOVEL_KEY);
};