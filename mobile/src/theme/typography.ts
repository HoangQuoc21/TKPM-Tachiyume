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
  tinySmall: {
    fontFamily: fontFamily.primary,
    fontSize: 8,
  },
  tiny: {
    fontFamily: fontFamily.primary,
    fontSize: 9,
  },
  tinyLarge: {
    fontFamily: fontFamily.primary,
    fontSize: 10,
  },

  noteSmall: {
    fontFamily: fontFamily.primary,
    fontSize: 11,
  },
  note: {
    fontFamily: fontFamily.primary,
    fontSize: 12,
  },
  noteLarge: {
    fontFamily: fontFamily.primary,
    fontSize: 13,
  },

  bodySmall: {
    fontFamily: fontFamily.primary,
    fontSize: 14,
  },
  body: {
    fontFamily: fontFamily.primary,
    fontSize: 15,
  },
  bodyLarge: {
    fontFamily: fontFamily.primary,
    fontSize: 16,
  },

  headlineSmall: {
    fontFamily: fontFamily.primary,
    fontSize: 17,
  },
  headline: {
    fontFamily: fontFamily.primary,
    fontSize: 18,
  },
  headlineLarge: {
    fontFamily: fontFamily.primary,
    fontSize: 19,
  },

  title3Small: {
    fontFamily: fontFamily.primary,
    fontSize: 20,
  },
  title3: {
    fontFamily: fontFamily.primary,
    fontSize: 21,
  },
  title3Large: {
    fontFamily: fontFamily.primary,
    fontSize: 22,
  },

  title2Small: {
    fontFamily: fontFamily.primary,
    fontSize: 23,
  },
  title2: {
    fontFamily: fontFamily.primary,
    fontSize: 24,
  },
  title2Large: {
    fontFamily: fontFamily.primary,
    fontSize: 25,
  },

  title1Small: {
    fontFamily: fontFamily.primary,
    fontSize: 26,
  },
  title1: {
    fontFamily: fontFamily.primary,
    fontSize: 27,
  },
  title1Large: {
    fontFamily: fontFamily.primary,
    fontSize: 28,
  },
}