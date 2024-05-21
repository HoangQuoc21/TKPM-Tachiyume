import { StyleProp, ViewStyle } from "react-native";
import { ISourceListPresets } from "./source-list.presets";

export interface SourceListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * One of the different types of SourceList presets.
   */
  preset?: ISourceListPresets

  /**
   * Other props goes here
   */
}