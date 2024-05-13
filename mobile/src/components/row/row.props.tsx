import { ViewStyle, StyleProp } from "react-native"
import { IRowPresets } from "./row.presets"
import { ViewProps } from "../view/view.props"

export interface RowProps extends ViewProps{
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  
  /**
   * One of the different types of Row presets.
   */
  preset?: IRowPresets

  /**
   * Other props goes here
   */

}