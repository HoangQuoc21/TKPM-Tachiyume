import { ViewStyle } from "react-native"
import { color, typography } from "../../theme"

/**
 * A list of preset names.
 */
export const VectorIconPresets = {
  default: "default",
}

/**
 * All VectorIcon will start off looking like this.
 */
const BASE_STYLE = {
  ICON: {
    // flex:1
  } as ViewStyle,
}

/**
 * All the variations of VectorIcon styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const stylePresets = {
  /**
   * The default VectorIcon styles.
   */
  [VectorIconPresets.default]: { ...BASE_STYLE },
}

/**
 * All VectorIcon will start off having this. Replace [PropsType] with corresponding type.
 */
const BASE_PROPS = {
  color: color.ligthTheme.text,
  ...typography.bodyMedium,
}

/**
 * All the variations of VectorIcon props within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const propPresets = {
  /**
   * The default VectorIcon props.
   */
  [VectorIconPresets.default]: { ...BASE_PROPS },
}

export type IVectorIconPresets = keyof typeof VectorIconPresets
