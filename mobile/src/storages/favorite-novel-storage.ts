import AsyncStorage from "@react-native-async-storage/async-storage";
import Novel from "../models/novel";

const FAVORITE_NOVEL_KEY = "favorite_novels"

// Save the type consist of Novel and Source object
type FavoriteNovelType = {novel: Novel, source: any};

export const getFavoriteNovels = async (): Promise<FavoriteNovelType[]> => {
    const novels = await AsyncStorage.getItem(FAVORITE_NOVEL_KEY);
    
    const result = novels ? JSON.parse(novels) : [];
    return result.reverse();
};

export const saveFavoriteNovels = async (novels: FavoriteNovelType[]): Promise<void> => {
    await AsyncStorage.setItem(FAVORITE_NOVEL_KEY, JSON.stringify(novels));
};

export const addFavoriteNovel = async (novel: Novel, source: any): Promise<boolean> => {
    //console.log('Adding favorite novel to storage:', novel);
    const novels = await getFavoriteNovels();

    // Check if the novel is already in the list, if so, return false
    const index = novels.findIndex((n) => n.novel.title === novel.title);
    if (index == -1) {
        return false;
    }

    //Check if the the novel list is more than 20, if so, remove the last one
    if (novels.length >= 20) {
        novels.unshift();
    }

    novels.push({novel, source});
    await saveFavoriteNovels(novels);

    return true;
};

export const removeFavoriteNovel = async (novel: Novel): Promise<void> => {
    const novels = await getFavoriteNovels();
    const index = novels.findIndex((n) => n.novel.title === novel.title);
    if (index !== -1) {
        novels.splice(index, 1);
        await saveFavoriteNovels(novels);
    }
};

export const clearFavoriteNovelsInStorage = async (): Promise<void> => {
    await AsyncStorage.removeItem(FAVORITE_NOVEL_KEY);
};