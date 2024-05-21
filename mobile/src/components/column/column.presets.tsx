import { ViewStyle } from "react-native"

/**
 * A list of preset names.
 */
export const ColumnPresets = {
  default: "default",
}


/**
 * All Column will start off looking like this.
 */
const BASE_STYLE = {
  CONTAINER: {
    // flex:1
    flexDirection: "column",
  } as ViewStyle,
}

/**
 * All the variations of Column styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const stylePresets = {
  /**
   * The default Column styles.
   */
  [ColumnPresets.default]: { ...BASE_STYLE },
}

/**
 * All Column will start off having this. Replace [PropsType] with corresponding type.
 */
const BASE_PROPS = {}

/**
 * All the variations of Column props within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const propPresets = {
  /**
   * The default Column props.
   */
  [ColumnPresets.default]: { ...BASE_PROPS },
}

export type IColumnPresets = keyof typeof ColumnPresets
