import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export const color = {
  // Common color for both theme
  common: {
    // Specific color
    black: 'black',
    gray: 'gray',
    white: 'white',
    blue: 'blue',
    red: 'red',
    pink: "#FF6086",

    // Transparent color
    transparent: 'rgba(0,0,0,0)',

    // Overlay color
    overlay: 'rgba(0,0,0,0.5)',

    // Status color
    status: {
      success: 'black',
      warning: 'black',
      error: 'black',
    },


  },

  // Light Theme
  lightTheme: {
    // Main color theme for app
    primary: '#FFF8F3',
    secondary: '#F8ECDF',
    third: "#FEF2E5",
    fourth: "#F2E6DA",

    // Text and text-related color
    text: '#201B13',
    textSecondary: 'black',
    placeHolder: '',

    // Accent color
    accent: '#201B13',
    accentSecondary: '#F9DFBB',
    accentThird: "#7E570E",

    // Border color
    boder: "#D2C4B4",

    // Inactive color
    inactive: '#4F4539',
  },

  // Dark Theme
  darkTheme: {
    // Main color theme for app
    primary: 'dark',
    secondary: 'light',

    // Text and text-related color
    text: '#fff',
    textSecondary: 'light',
    placeHolder: 'light',

    // Accent color
    accent: 'light',
    accentSecondary: 'light',
    accentThird: '#392306',

    // Background color
    background: 'light',
  },
}
