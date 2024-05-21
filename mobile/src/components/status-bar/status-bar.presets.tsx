import { ViewStyle } from "react-native"
import { color } from "../../theme"

/**
 * A list of preset names.
 */
export const StatusBarPresets = {
  default: "default",
  light: "light",
  dark: "dark",
  auto: "dark",
  invert: "dark",
}

/**
 * All StatusBar will start off looking like this.
 */
const BASE_STYLE = {
  CONTAINER: {
    // flex:1
    backgroundColor:color.ligthTheme.primary,
  } as ViewStyle,
}

/**
 * All the variations of StatusBar styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const stylePresets = {
  /**
   * The default StatusBar styles.
   */
  [StatusBarPresets.default]: { ...BASE_STYLE },
}

/**
 * All StatusBar will start off having this. Replace [PropsType] with corresponding type.
 */
const BASE_PROPS = {}

/**
 * All the variations of StatusBar props within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const propPresets = {
  /**
   * The default StatusBar props.
   */
  [StatusBarPresets.default]: { ...BASE_PROPS },
  [StatusBarPresets.light]: { ...BASE_PROPS },
  [StatusBarPresets.dark]: { ...BASE_PROPS },
  [StatusBarPresets.auto]: { ...BASE_PROPS },
  [StatusBarPresets.invert]: { ...BASE_PROPS },
}

export type IStatusBarPresets = keyof typeof StatusBarPresets
