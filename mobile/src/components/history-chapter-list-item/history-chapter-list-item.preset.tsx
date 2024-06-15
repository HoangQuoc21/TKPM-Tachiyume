import { ViewStyle, TextStyle, ImageStyle } from "react-native";

import {
  color,
  metric,
  radius,
  spacing,
  typography,
  shadow,
} from "../../theme";

export const HistoryChapterListItemPresets = {
  default: "default",
};

const DEFAULT_STYLE = {
  ROOT: {
    flexDirection: "row",
    marginHorizontal: spacing[1],
    marginVertical: spacing[2],
    borderRadius: radius[4],
    alignContent: "center",
    backgroundColor: color.lightTheme.third,
    flex: 1,

    // shadow
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: radius[5],
    elevation: 5,
  } as ViewStyle,
  NOVEL_IMAGE: {
    width: 100,
    height: 100,
    borderTopLeftRadius: radius[4],
    borderBottomLeftRadius: radius[4],
    flex: 3
  } as ImageStyle,
  NOVEL_TITLE: {
    ...typography.labelMedium,
    justifyContent: "center",
    fontWeight: "bold",
    paddingLeft: spacing[2],
  } as TextStyle,
  CHAPTER_CONTAINER:{
    justifyContent: "center",
    flex: 7,
  } as ViewStyle,
  CHAPTER_TITLE: {
    ...typography.bodySmall,
    justifyContent: "center",
    fontWeight: "normal",
    paddingLeft: spacing[2],
  } as TextStyle,
};


export const stylePresets = {
  default: {
    ...DEFAULT_STYLE,
  },
};

export type HistoryChapterListItemPresets = keyof typeof stylePresets;
