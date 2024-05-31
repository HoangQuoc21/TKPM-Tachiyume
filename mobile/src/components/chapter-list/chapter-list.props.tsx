import { StyleProp, ViewStyle } from "react-native";
import { IChapterListPresets } from "./chapter-list.presets";
import Source from "../../models/sources/source";
import Novel from "../../models/novel";

export interface ChapterListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * One of the different types of SourceList presets.
   */
  preset?: IChapterListPresets;

  /**
   * Other props goes here
   */
  source: Source;
  novel: Novel;
}
