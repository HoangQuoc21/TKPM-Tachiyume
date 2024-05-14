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

    // Transparent color
    transparent: 'rgba(0,0,0,0)',

    // Status color
    status: {
      success: 'black',
      warning: 'black',
      error: 'black',
    },


  },

  // Light Theme
  ligthTheme: {
    // Main color theme for app
    primary: '#FFF8F3',
    secondary: '#F8ECDF',

    // Text and text-related color
    text: '#201B13',
    textSecondary: 'black',
    placeHolder: '',

    // Accent color#
    accent: '#201B13',
    accentSecondary: '#F9DFBB',

    // Background color
    background: 'black',

    // Inactive color
    inactive: '#4F4539',
  },

  // Dark Theme
  darkTheme: {
    // Main color theme for app
    primary: 'dark',
    secondary: 'light',

    // Text and text-related color
    text: 'light',
    textSecondary: 'light',
    placeHolder: 'light',

    // Accent color
    accent: 'light',
    accentSecondary: 'light',

    // Background color
    background: 'light',
  },
}
