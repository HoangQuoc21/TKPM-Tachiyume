import { ViewStyle, TextStyle, ImageStyle } from "react-native";

import {
  color,
  metric,
  radius,
  spacing,
  typography,
  shadow,
} from "../../theme";

export const ChapterListItemPresets = {
  default: "default",
  simple: "simple",
};

const DEFAULT_STYLE = {
  CONTAINER: {
    flexDirection: "row",
    marginHorizontal: spacing[1],
    marginVertical: spacing[2],
    borderRadius: radius[4],
    alignContent: "center",
    backgroundColor: color.ligthTheme.third,
    height: 60,

    // shadow
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: radius[5],
    elevation: 5,
  } as ViewStyle,
  TEXT: {
    ...typography.labelSmall,
    justifyContent: "center",
    fontWeight: "normal",

    paddingLeft: spacing[2],
    fontSize: typography.bodySmall.fontSize,
  } as TextStyle,
};

const SIMPLE_STYLE = {
  CONTAINER: {
    flexDirection: "row",
    marginHorizontal: spacing[1],
    marginVertical: spacing[2],
    borderRadius: radius[4],
    alignContent: "center",
  } as ViewStyle,
  TEXT: {
    ...typography.labelSmall,
    justifyContent: "center",
    fontWeight: "normal",
    paddingLeft: spacing[2],
    fontSize: typography.bodySmall.fontSize,
  } as TextStyle,
};

export const stylePresets = {
  default: {
    ...DEFAULT_STYLE,
  },
  simple: {
    ...SIMPLE_STYLE,
  },
};

export type ChapterListItemPresets = keyof typeof stylePresets;
