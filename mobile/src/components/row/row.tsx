import * as React from "react"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"
import { propPresets, stylePresets } from "./row.presets"
import { RowProps } from "./row.props"
import { View } from "../view/view"

/**
 * Describe your component here
 */
export const Row = observer(function Row(props: RowProps) {
  const {
    preset = "default",
    style: styleOverride,
    children,
    ...rest
  } = props

  const presetStyles = stylePresets[preset] || stylePresets.default
  const presetProps = propPresets[preset] || propPresets.default

  const containerStyles = flatten([presetStyles.CONTAINER, styleOverride])

  const componentProps = { ...presetProps, ...rest }

  return (
    <View style={containerStyles} {...componentProps}>
      {children}
    </View>
  )
})
