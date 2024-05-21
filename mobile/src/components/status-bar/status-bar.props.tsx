import { IStatusBarPresets } from "./status-bar.presets"
import { StatusBarStyle } from "expo-status-bar"

export interface StatusBarProps {
  /**
   * One of the different types of StatusBar presets.
   */
  preset?: IStatusBarPresets

  /**
   * Other props goes here
   */
  style?: StatusBarStyle
}