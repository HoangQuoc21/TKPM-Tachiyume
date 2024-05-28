import AsyncStorage from "@react-native-async-storage/async-storage";
import Source from "../models/sources/source";

const NOVEL_SOURCES_KEY = "novel_sources";

export const getSourcesFromStorage = async (): Promise<Source[]> => {
  const sources = await AsyncStorage.getItem(NOVEL_SOURCES_KEY);
  return sources ? JSON.parse(sources) : [];
};

export const saveSourcesToStorage = async (sources: Source[]): Promise<void> => {
  await AsyncStorage.setItem(NOVEL_SOURCES_KEY, JSON.stringify(sources));
};

export const addSourceToStorage = async (source: Source): Promise<void> => {
  console.log('--> add Source called')
  const sources = await getSourcesFromStorage();
  sources.push(source);
  await saveSourcesToStorage(sources);
};

export const removeSourceFromStorage = async (source: Source): Promise<void> => {
  const sources = await getSourcesFromStorage();
  const index = sources.findIndex((s) => s.id === source.id);
  if (index !== -1) {
    sources.splice(index, 1);
    await saveSourcesToStorage(sources);
  }
};

export const clearSourcesInStorage = async (): Promise<void> => {
  console.log('--> clear Source called')
  await AsyncStorage.removeItem(NOVEL_SOURCES_KEY);
};