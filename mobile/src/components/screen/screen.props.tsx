import React from "react"
import { NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from "react-native"
import { IScreenPresets, KeyboardOffsets } from "./screen.presets"
import { StatusBarProps } from "../status-bar/status-bar.props"

export interface ScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * One of the different types of presets.
   */
  preset?: IScreenPresets

  /**
   * An optional background color
   */
  backgroundColor?: string

  /**
   * An optional status bar setting. Defaults to light-content.
   */
  statusBar?: StatusBarProps

  /**
   * Should we not wrap in SafeAreaView? Defaults to false.
   */
  unsafe?: boolean

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never"

  onScroll?(event: NativeSyntheticEvent<NativeScrollEvent>): void
}
