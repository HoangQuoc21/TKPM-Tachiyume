import { StyleProp, ViewStyle } from "react-native";
import { IHistoryChapterListPresets } from "./history-chapter-list.presets";

export interface HistoryChapterListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * One of the different types of SourceList presets.
   */
  preset?: IHistoryChapterListPresets;

}
