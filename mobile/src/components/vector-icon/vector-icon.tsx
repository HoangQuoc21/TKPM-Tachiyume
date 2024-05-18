import * as React from "react"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"
import { propPresets, stylePresets } from "./vector-icon.presets"
import { VectorIconProps } from "./vector-icon.props"
import { Ionicons } from "@expo/vector-icons"

/**
 * Describe your component here
 */
export const VectorIcon = observer(function VectorIcon(props: VectorIconProps) {
  const {
    preset = "default",
    style: styleOverride,
    ...rest
  } = props

  const presetStyles = stylePresets[preset] || stylePresets.default
  const presetProps = propPresets[preset] || propPresets.default

  const iconStyles = flatten([presetStyles.ICON, styleOverride])

  const componentProps = { ...presetProps, ...rest }

  return (
    <Ionicons {...componentProps} style={iconStyles} />
  )
})
