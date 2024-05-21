import { ViewStyle, StyleProp } from "react-native"
import { IColumnPresets } from "./column.presets"
import { ViewProps } from "../view/view.props"

export interface ColumnProps extends ViewProps{
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  
  /**
   * One of the different types of Column presets.
   */
  preset?: IColumnPresets

  /**
   * Other props goes here
   */
}