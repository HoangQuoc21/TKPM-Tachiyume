import { ViewStyle } from "react-native"

/**
 * A list of preset names.
 */
export const RowPresets = {
  default: "default",
}


/**
 * All Row will start off looking like this.
 */
const BASE_STYLE = {
  CONTAINER: {
    flexDirection: "row",
  } as ViewStyle,
}

/**
 * All the variations of Row styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const stylePresets = {
  /**
   * The default Row styles.
   */
  [RowPresets.default]: { ...BASE_STYLE },
}

/**
 * All Row will start off having this. Replace [PropsType] with corresponding type.
 */
const BASE_PROPS = {}

/**
 * All the variations of Row props within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const propPresets = {
  /**
   * The default Row props.
   */
  [RowPresets.default]: { ...BASE_PROPS },
}

export type IRowPresets = keyof typeof RowPresets
