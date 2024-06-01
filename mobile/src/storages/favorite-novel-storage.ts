import AsyncStorage from "@react-native-async-storage/async-storage";
import Novel from "../models/novel";

const FAVORITE_NOVEL_KEY = "favorite_novels"

export const getFavoriteNovelsFromStorage = async (): Promise<Novel[]> => {
    const novels = await AsyncStorage.getItem(FAVORITE_NOVEL_KEY);
    
    const result = novels ? JSON.parse(novels) : [];
    return result.reverse();
};

export const saveFavoriteNovelsToStorage = async (novels: Novel[]): Promise<void> => {
    await AsyncStorage.setItem(FAVORITE_NOVEL_KEY, JSON.stringify(novels));
};

export const addFavoriteNovelToStorage = async (novel: Novel): Promise<boolean> => {
    const novels = await getFavoriteNovelsFromStorage();

    // Check if the novel is already in the list, if so, return false
    const index = novels.findIndex((n) => n.id === novel.id);
    if (index == -1) {
        return false;
    }

    //Check if the the novel list is more than 20, if so, remove the last one
    if (novels.length >= 20) {
        novels.unshift();
    }

    novels.push(novel);
    await saveFavoriteNovelsToStorage(novels);

    return true;
};

export const removeFavoriteNovelFromStorage = async (novel: Novel): Promise<void> => {
    const novels = await getFavoriteNovelsFromStorage();
    const index = novels.findIndex((n) => n.id === novel.id);
    if (index !== -1) {
        novels.splice(index, 1);
        await saveFavoriteNovelsToStorage(novels);
    }
};

export const clearFavoriteNovelsInStorage = async (): Promise<void> => {
    await AsyncStorage.removeItem(FAVORITE_NOVEL_KEY);
};