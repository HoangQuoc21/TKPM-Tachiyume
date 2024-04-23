import { Platform } from "react-native"


export const fontFamily = {
  /**
   * The primary font.  Used in most places.
   */
  primary: Platform.select({ ios: "Helvetica", android: "normal" }),

  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: "Arial", android: "sans-serif" }),

  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: "Courier", android: "monospace" }),
}

export const typography = {
  tiny: {
    fontFamily: fontFamily.primary,
    fontSize: 9,
  },
  note: {
    fontFamily: fontFamily.primary,
    fontSize: 12,
  },
  body: {
    fontFamily: fontFamily.primary,
    fontSize: 15,
  },
  headline: {
    fontFamily: fontFamily.primary,
    fontSize: 18,
  },
  title3: {
    fontFamily: fontFamily.primary,
    fontSize: 21,
  },
  title2: {
    fontFamily: fontFamily.primary,
    fontSize: 24,
  },
  title1: {
    fontFamily: fontFamily.primary,
    fontSize: 27,
  },
}