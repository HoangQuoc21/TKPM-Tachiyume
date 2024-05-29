import { ViewStyle, TextStyle } from "react-native";

import {
  color,
  metric,
  radius,
  spacing,
  typography,
  shadow,
} from "../../theme";

export const NovelDetailPresets = {
  default: "default",
};

const DEFAULT_STYLE = {
  CONTAINER: {
    flex: 1,
  } as ViewStyle,
  CONTAINER_DETAILS:{
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  } as ViewStyle, 
  THUMBNAIL:{
    width: 100,
    height: 150,
    resizeMode: 'cover',
    marginRight: 10,
  },
  DETAILS:{
    flex: 1,
  },
  TITLE:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  AUTHORS:{
    fontSize: 16,
    color: 'gray',
  },
  STATUS:{
    fontSize: 16,
    color: 'green',
  },
  LOADING_CONTAINER: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  } as ViewStyle,
  LOADING: {} as TextStyle,
  
  
};

export const stylePresets = {
  [NovelDetailPresets.default]: { ...DEFAULT_STYLE },
};

export type INovelDetailPresets = keyof typeof NovelDetailPresets;
