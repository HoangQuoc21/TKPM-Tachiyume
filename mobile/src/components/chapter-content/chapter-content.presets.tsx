import { ViewStyle, TextStyle } from "react-native";

import {
  color,
  metric,
  radius,
  spacing,
  typography,
  shadow,
  fontFamily,
} from "../../theme";

export const ChapterContentPresets = {
  default: "default",
};

const DEFAULT_STYLE = {
  CONTAINER: {
    flex: 1,
  } as ViewStyle,
  LOADING_CONTAINER: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  } as ViewStyle,
  LOADING: {} as TextStyle,
  SHEET_CONTENT: {
    padding: spacing[4],
  } as ViewStyle,

  LIGHT_THEME:{
    TITLE_CONTAINER: {
    } as ViewStyle,
    TITLE: {
      ...typography.bodyLarge,
      fontWeight: "bold",
      color: color.ligthTheme.text,
    } as TextStyle,
    CONTENT_CONTAINER: {
      flexGrow: 1,
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[2],
    } as ViewStyle,
    CONTENT: {
      ...typography.bodySmall,
    },
    FOOTER: {
      justifyContent: 'space-around',
      padding: spacing[4],
      backgroundColor: color.ligthTheme.fourth,
      borderTopWidth: 0.5,
      borderColor: color.ligthTheme.boder,
    } as ViewStyle,
    SHEET_CONTAINER: {
      borderTopLeftRadius: radius[4],
      borderTopRightRadius: radius[4],
      backgroundColor: color.ligthTheme.fourth,
      borderWidth: 1,
      borderColor: color.ligthTheme.boder,
    },
   
    BUTTON_CONTAINER: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: spacing[2],
    },
    FONT_BUTTON: {
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[3],
      backgroundColor: color.ligthTheme.accentSecondary,
      borderRadius: spacing[2],
      borderWidth: 0.3,
      borderColor: color.ligthTheme.boder,
      shadowColor: "black",
      shadowOpacity: 0.3,
      shadowRadius: radius[5],
      elevation: 1.4,
    },
    ICON:{
      color: color.ligthTheme.accent,
    }
  },

  DARK_THEME: {
    TITLE_CONTAINER: {
    } as ViewStyle,
    TITLE: {
      ...typography.bodyLarge,
      fontWeight: "bold",
      color: 'black',
    } as TextStyle,
    CONTENT_CONTAINER: {
      flexGrow: 1,
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[2],
      backgroundColor: 'black',
    } as ViewStyle,
    CONTENT: {
      ...typography.bodySmall,
      color: 'white',
    },
    FOOTER: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: spacing[4],
      backgroundColor: 'black',
      borderTopWidth: 0.5,
      borderColor: 'white',
    } as ViewStyle,
    SHEET_CONTAINER: {
      borderTopLeftRadius: radius[4],
      borderTopRightRadius: radius[4],
      backgroundColor: 'black',
      borderWidth: 1,
      borderColor: 'white',
    },
    SHEET_CONTENT: {
      padding: spacing[4],
    },
    BUTTON_CONTAINER: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: spacing[2],
    },
    FONT_BUTTON: {
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[3],
      backgroundColor: '#C4C4C4',
      borderRadius: spacing[2],
      borderWidth: 0.3,
      borderColor: 'white',
    },
    ICON: {
      color: 'white',
    }
  }
};

export const stylePresets = {
  [ChapterContentPresets.default]: { ...DEFAULT_STYLE },
};

export type IChapterContentPresets = keyof typeof ChapterContentPresets;
