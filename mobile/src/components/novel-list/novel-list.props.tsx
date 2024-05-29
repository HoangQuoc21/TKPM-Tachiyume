import { StyleProp, ViewStyle } from "react-native";
import { INovelListPresets } from "./novel-list.presets";
import Source from "../../models/sources/source";

export interface NovelListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * One of the different types of SourceList presets.
   */
  preset?: INovelListPresets;

  /**
   * Other props goes here
   */
  source: Source;
}
