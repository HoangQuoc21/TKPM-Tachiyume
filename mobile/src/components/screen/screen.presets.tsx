import { ViewStyle } from "react-native"
import { color, spacing } from "../../theme"

/**
 * A list of preset names.
 */
export const ScreenPresets = {
  fixed: "fixed",
  scroll: "scroll",
}

/**
 * All screen keyboard offsets.
 */
export const offsets = {
  none: 0,
  automaticSupport: 62 + spacing[3] * 2,
}

/**
 * The variations of keyboard offsets.
 */
export type KeyboardOffsets = keyof typeof offsets

/**
 * All Screen will start off looking like this.
 */
const BASE_STYLE = {
  OUTER: {
    backgroundColor: color.ligthTheme.primary,
    flex: 1,
    height: "100%",
    paddingBottom: 60,
  } as ViewStyle,
  INNER: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    height: "100%",
    width: "100%",
  } as ViewStyle,
  INNER_CONTAINER: {
    backgroundColor: color.ligthTheme.primary,
    flex: 1,
    height: "100%",
  } as ViewStyle,
}

/**
 * All the variations of Screen styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const stylePresets = {
  /**
   * The default Screen styles.
   */
  [ScreenPresets.fixed]: BASE_STYLE,
  [ScreenPresets.scroll]: {
    ...BASE_STYLE,
    OUTER: {
      backgroundColor: color.ligthTheme.primary,
      flex: 1,
      height: "100%",
    } as ViewStyle,
    INNER: {
      justifyContent: "flex-start",
      alignItems: "stretch",
      minHeight: "100%",
    } as ViewStyle,
  },
}

/**
 * All Screen will start off having this. Replace [PropsType] with corresponding type.
 */
const BASE_PROPS = {}

/**
 * All the variations of Screen props within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const propPresets = {
  /**
   * The default Screen props.
   */
  [ScreenPresets.fixed]: { ...BASE_PROPS },
  [ScreenPresets.scroll]: { ...BASE_PROPS },
}

export type IScreenPresets = keyof typeof ScreenPresets


/**
 * Is this preset a non-scrolling one?
 *
 * @param preset The preset to check
 */
export function isNonScrolling(preset?: IScreenPresets) {
  // any of these things will make you scroll
  return !preset || !ScreenPresets[preset] || preset === ScreenPresets.fixed
}
