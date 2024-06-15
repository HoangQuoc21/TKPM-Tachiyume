import { ViewStyle, TextStyle } from "react-native";

import {
  color,
  metric,
  radius,
  spacing,
  typography,
  shadow,
} from "../../theme";

export const ChapterListPresets = {
  default: "default",
};

const DEFAULT_STYLE = {
  CONTAINER: {
    flex: 1,
    //marginTop: 300,
  } as ViewStyle,
  
  LIST_CONTAINER: {
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
  [ChapterListPresets.default]: { ...DEFAULT_STYLE },
};

export type IChapterListPresets = keyof typeof ChapterListPresets;
