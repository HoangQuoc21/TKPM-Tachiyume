import { StyleProp, ViewStyle } from "react-native"
import { IVectorIconPresets } from "./vector-icon.presets"

export interface VectorIconProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * One of the different types of VectorIcon presets.
   */
  preset?: IVectorIconPresets

  /**
   * Other props goes here
   */

  name: any
  color?: string
  size?: number
}