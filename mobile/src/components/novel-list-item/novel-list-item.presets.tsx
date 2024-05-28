import { ViewStyle, TextStyle, ImageStyle } from "react-native";

import {
  color,
  metric,
  radius,
  spacing,
  typography,
  shadow,
} from "../../theme";

export const NovelListItemPresets = {
  default: "default",
};

const DEFAULT_STYLE = {
  CONTAINER: {
    flexDirection: "row",
    marginHorizontal: spacing[1],
    marginVertical: spacing[2],
    borderRadius: radius[4],
    alignContent: "center",
    backgroundColor: color.ligthTheme.third,

    // shadow
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: radius[5],
    elevation: 5,
  } as ViewStyle,
  IMAGE: {
    flex: 25,
    width: "100%",
    height: "100%",
    backgroundColor: color.common.white,
    borderBottomLeftRadius: radius[4],
    borderTopLeftRadius: radius[4],
  } as ImageStyle,
  TEXT_CONTAINER: {
    flex: 75,
    justifyContent: "center",
    borderColor: color.ligthTheme.fourth,
    borderStartWidth: 1,
  } as ViewStyle,
  TEXT: {
    ...typography.labelSmall,
    fontWeight: "bold",
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[4],
  } as TextStyle,
};

export const stylePresets = {
  default: {
    ...DEFAULT_STYLE,
  },
};

export type NovelListItemPresets = keyof typeof stylePresets;
