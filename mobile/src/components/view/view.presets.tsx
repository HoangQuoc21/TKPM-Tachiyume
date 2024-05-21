import { ViewStyle, TextStyle } from "react-native"

/**
 * A list of preset names.
 */
export const ViewPresets = {
  default: "default",
}


/**
 * All View will start off looking like this.
 */
const BASE_STYLE = {
    CONTAINER: {
        // flex:1
    } as ViewStyle
}

/**
 * All the variations of View styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const stylePresets = {
  /**
   * The default View styles.
   */
  [ViewPresets.default]: { ...BASE_STYLE },
}

/**
 * All View will start off having this. Replace [PropsType] with corresponding type.
 */
const BASE_PROPS = {}

/**
 * All the variations of View props within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const propPresets = {
  /**
   * The default View props.
   */
  [ViewPresets.default]: { ...BASE_PROPS },
}

export type IViewPresets = keyof typeof ViewPresets
