import { StyleProp, ViewProps as NativeViewProps, ViewStyle } from "react-native"
import { IViewPresets } from "./view.presets"
import React from "react"

export interface ViewProps extends NativeViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * One of the different types of View presets.
   */
  preset?: IViewPresets

  /**
   * Other props goes here
   */
  children?: React.ReactNode

  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly"

  alignItems?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline"

  safeArea?: boolean

  safeAreaEdges?: any
}