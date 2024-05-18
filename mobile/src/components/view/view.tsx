import * as React from "react"
import { View as NativeView } from "react-native"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"
import { propPresets, stylePresets } from "./view.presets"
import { ViewProps } from "./view.props"
import { SafeAreaView } from "react-native-safe-area-context"

/**
 * Describe your component here
 */
export const View = observer(function View(props: ViewProps) {
  const {
    preset = "default",
    style: styleOverride,
    children,
    justifyContent,
    alignItems,
    safeArea = false,
    safeAreaEdges,
    ...rest
  } = props

  const presetStyles = stylePresets[preset] || stylePresets.default
  const presetProps = propPresets[preset] || propPresets.default

  let containerStyles = flatten([presetStyles.CONTAINER, styleOverride])

  const componentProps = { ...presetProps, ...rest }

  if (justifyContent) {
    containerStyles = flatten([containerStyles, { justifyContent }])
  }

  if (alignItems) {
    containerStyles = flatten([containerStyles, { alignItems }])
  }

  const renderChildren = () => {
    return children || null
  }

  const renderSafeArea = () => {
    return <SafeAreaView edges={safeAreaEdges} style={containerStyles} {...componentProps}>
      {renderChildren()}
    </SafeAreaView>
  }

  const renderUnsafeArea = () => {
    return <NativeView style={containerStyles} {...componentProps}>
      {renderChildren()}
    </NativeView>
  }

  return (
    safeArea ? renderSafeArea() : renderUnsafeArea()
  )
})
