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
    //marginTop: 300,
  } as ViewStyle,
  TITLE_CONTAINER: {
    //marginBottom: spacing[2],
    //paddingBottom:spacing[2],
  } as ViewStyle,
  TITLE: {
    ...typography.bodyLarge,
    fontWeight: "bold",
    color: color.ligthTheme.text,
  } as TextStyle,
  
  LOADING_CONTAINER: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  } as ViewStyle,
  LOADING: {} as TextStyle,

  CONTENT_CONTAINER: {
    flexGrow: 1,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[2],
  } as ViewStyle,
  DARK_MODE: {
    backgroundColor: color.darkTheme.primary,
    color: color.darkTheme.text,
  },
  LIGHT_MODE: {
    backgroundColor: color.ligthTheme.primary,
    color: color.ligthTheme.text,
  },
  CONTENT: {
    ...typography.bodySmall,
    //fontSize: typography.bodySmall.fontSize,
    //fontSize: 30,
    //lineHeight: 20,
    //fontFamily: 'vincHand',
    //letterSpacing: 1.5,
    
  },
  FOOTER: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing[4],
    backgroundColor: color.ligthTheme.fourth,
    borderTopWidth: 0.5,
    borderTopColor: color.ligthTheme.boder,
  },
  SHEET_CONTAINER: {
    //padding: spacing[4],
    borderTopLeftRadius: radius[4],
    borderTopRightRadius: radius[4],
    backgroundColor: color.ligthTheme.fourth,
    borderWidth: 1,
    borderColor: color.ligthTheme.boder,
  },
  SHEET_CONTENT: {
    padding: spacing[4],
    //borderTopLeftRadius: radius[9],
    //backgroundColor: color.ligthTheme.fourth,
    //borderWidth: 1,
    //borderColor: color.ligthTheme.boder,
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
 
};

export const stylePresets = {
  [ChapterContentPresets.default]: { ...DEFAULT_STYLE },
};

export type IChapterContentPresets = keyof typeof ChapterContentPresets;
