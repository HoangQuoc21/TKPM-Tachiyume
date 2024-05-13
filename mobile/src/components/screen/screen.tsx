import * as React from "react"
import { useEffect } from "react"
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, stylePresets } from "./screen.presets"
import { StatusBar } from "../status-bar/status-bar"
import { View } from "../view/view"
import { color } from "../../theme"

// const isIos = Platform.OS === "ios"

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export const Screen = (props: ScreenProps) => {
  const {
    preset = "fixed",
    backgroundColor,
    style: styleOverride,
    unsafe,
    statusBar= { style:"auto", backgroundColor: color.ligthTheme.primary},
  } = props

  const insets = useSafeAreaInsets()

  const presetStyles = stylePresets[preset] || stylePresets.default

  const backgroundStyle = backgroundColor ? { backgroundColor: backgroundColor } : {}

  const isNotScrollable = isNonScrolling(preset)

  let insetStyle = {}
  if (!unsafe) {
    insetStyle = { paddingTop: insets.top }
  }

  let scrollInsetStyle = {}
  if (!isNotScrollable) {
    const bottomInset = insets.bottom
    if (bottomInset !== 0) {
      scrollInsetStyle = { paddingBottom: bottomInset * 2 }
    }
  }

  const outerStyles = StyleSheet.flatten([presetStyles.OUTER, backgroundStyle])
  const innerContainerStyles = StyleSheet.flatten([presetStyles.INNER_CONTAINER, backgroundStyle])
  const innerStyles = StyleSheet.flatten([presetStyles.INNER, insetStyle, scrollInsetStyle, styleOverride])

  const renderFixed = () => {
    return <View style={innerStyles}>{props.children}</View>
  }

  const renderScroll = () => {
    // @ts-ignore
    return <ScrollView
      style={innerContainerStyles}
      contentContainerStyle={innerStyles}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onScroll={props.onScroll}
    >
      {props.children}
    </ScrollView>
  }

  const renderBody = () => {
    if (isNotScrollable) {
      return renderFixed()
    } else {
      return renderScroll()
    }
  }

  // @ts-ignore
  return <KeyboardAvoidingView
    style={outerStyles}
    keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
  >
    <StatusBar {...statusBar} />
    {renderBody()}
  </KeyboardAvoidingView>
}
