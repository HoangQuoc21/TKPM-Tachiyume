import { StyleProp, ViewStyle } from "react-native";
import { INovelDetailPresets } from "./novel-detail.presets";
import Source from "../../models/sources/source";
import Novel from "../../models/novel";

export interface NovelDetailProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * One of the different types of SourceList presets.
   */
  preset?: INovelDetailPresets;

  /**
   * Other props goes here
   */
  source: Source;
  novel: Novel;
}
