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
    fontSize: 16,
  },
  bodyMedium: {
    fontFamily: fontFamily.default,
    fontSize: 17,
  },
  bodyLarge: {
    fontFamily: fontFamily.default,
    fontSize: 18,
  },

  //label text
  labelSmall: {
    fontFamily: fontFamily.default,
    fontSize: 19,
  },
  labelMedium: {
    fontFamily: fontFamily.default,
    fontSize: 20,
  },
  labelLarge: {
    fontFamily: fontFamily.default,
    fontSize: 21,
  },

  //title text
  titleSmall: {
    fontFamily: fontFamily.default,
    fontSize: 22,
  },
  titleMedium: {
    fontFamily: fontFamily.default,
    fontSize: 23,
  },
  titleLarge: {
    fontFamily: fontFamily.default,
    fontSize: 24,
  },

  //headline text
  headlineSmall: {
    fontFamily: fontFamily.default,
    fontSize: 25,
  },
  headlineMedium: {
    fontFamily: fontFamily.default,
    fontSize: 26,
  },
  headdlineLage: {
    fontFamily: fontFamily.default,
    fontSize: 27,
  },

  //display text
  displaySmall: {
    fontFamily: fontFamily.default,
    fontSize: 28,
  },
  displayMedium: {
    fontFamily: fontFamily.default,
    fontSize: 29,
  },
  displayLarge: {
    fontFamily: fontFamily.default,
    fontSize: 30,
  },
}