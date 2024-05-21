import * as React from "react"
import { observer } from "mobx-react-lite"
import { propPresets } from "./status-bar.presets"
import { StatusBarProps } from "./status-bar.props"
import { StatusBar as NativeStatusBar } from "expo-status-bar"
//import { useIsFocused } from "@react-navigation/native"

/**
 * Describe your component here
 */
export const StatusBar = observer(function StatusBar(props: StatusBarProps) {
  const { preset = "default", style = "dark", ...rest } = props
  //const isFocused = useIsFocused()
  const presetProps = propPresets[preset] || propPresets.default
  const componentProps = { ...presetProps, ...rest }

  //return isFocused ? <NativeStatusBar style={style} {...componentProps} /> : null
  return <NativeStatusBar style={style} {...componentProps} /> 
})
