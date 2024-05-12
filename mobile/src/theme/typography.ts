import { Platform } from "react-native"

//define the font family based on the platform
export const fontFamily = {
  //define the default font family
  default: Platform.select({ android:"Roboto", ios: "Arial" }),
  //other font families go here
}

export const typography = {
  //body text
  bodySmall: {
    fontFamily: fontFamily.default,
    fontSize: 8,
  },
  bodyMedium: {
    fontFamily: fontFamily.default,
    fontSize: 9,
  },
  bodyLarge: {
    fontFamily: fontFamily.default,
    fontSize: 10,
  },

  //label text
  labelSmall: {
    fontFamily: fontFamily.default,
    fontSize: 11,
  },
  labelMedium: {
    fontFamily: fontFamily.default,
    fontSize: 12,
  },
  labelLarge: {
    fontFamily: fontFamily.default,
    fontSize: 13,
  },

  //title text
  titleSmall: {
    fontFamily: fontFamily.default,
    fontSize: 14,
  },
  titleMedium: {
    fontFamily: fontFamily.default,
    fontSize: 15,
  },
  titleLarge: {
    fontFamily: fontFamily.default,
    fontSize: 16,
  },

  //headline text
  headlineSmall: {
    fontFamily: fontFamily.default,
    fontSize: 17,
  },
  headlineMedium: {
    fontFamily: fontFamily.default,
    fontSize: 18,
  },
  headdlineLage: {
    fontFamily: fontFamily.default,
    fontSize: 19,
  },

  //display text
  displaySmall: {
    fontFamily: fontFamily.default,
    fontSize: 20,
  },
  displayMedium: {
    fontFamily: fontFamily.default,
    fontSize: 21,
  },
  displayLarge: {
    fontFamily: fontFamily.default,
    fontSize: 22,
  },
}