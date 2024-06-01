import { ViewStyle, TextStyle } from "react-native";

import {
  color,
  metric,
  radius,
  spacing,
  typography,
  shadow,
} from "../../theme";

export const ChapterContentPresets = {
  default: "default",
};

const DEFAULT_STYLE = {
  CONTAINER: {
    flex: 1,
    //marginTop: 300,
  } as ViewStyle,
  
  Content_CONTAINER: {
    //flex: 1,
    padding: spacing[3],
    gap: spacing[3],
  } as ViewStyle,
  TITLE_CONTAINER: {
    //marginBottom: spacing[2],
    //paddingBottom:spacing[2],
  } as ViewStyle,
  TITLE: {
    ...typography.bodyLarge,
    //fontWeight: "bold",
  } as TextStyle,
  
  LOADING_CONTAINER: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  } as ViewStyle,
  LOADING: {} as TextStyle,
 
};

export const stylePresets = {
  [ChapterContentPresets.default]: { ...DEFAULT_STYLE },
};

export type IChapterContentPresets = keyof typeof ChapterContentPresets;
