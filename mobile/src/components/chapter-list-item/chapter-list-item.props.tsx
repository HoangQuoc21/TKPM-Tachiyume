import { StyleProp, ViewStyle } from "react-native";
import { ChapterListItemPresets } from "./chapter-list-item.presets";
import Chapter from "../../models/chapter";
import Source from "../../models/sources/source";
import Novel from "../../models/novel";

export interface ChapterListItemProps {
  style?: StyleProp<ViewStyle>;
  preset?: ChapterListItemPresets;
  chapter: Chapter;
  source: Source;
  novel: Novel,
}
