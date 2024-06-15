import { StyleProp, ViewStyle } from "react-native";
import { IChapterContentPresets } from "./chapter-content.presets";
import Source from "../../models/sources/source";
import Novel from "../../models/novel";
import Chapter from "../../models/chapter";

export interface ChapterContentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * One of the different types of ChapterContent presets.
   */
  preset?: IChapterContentPresets;

  /**
   * Other props goes here
   */
  source: Source;
  novel: Novel;
  chapter: Chapter;

}
