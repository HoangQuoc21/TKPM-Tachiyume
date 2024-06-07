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
    paddingHorizontal: spacing[4],
  } as ViewStyle, 
  THUMBNAIL:{
    flex: 30,
    width: "100%",
    height: 150,
    resizeMode: 'cover',
    marginRight: spacing[3],
    borderRadius: radius[4],
    borderColor: color.lightTheme.secondary,
    borderWidth: 2, // Thêm border width
  },
  DETAILS:{
    flex: 70,
  } as ViewStyle,
  TITLE:{
    ...typography.titleMedium,
    fontWeight: 'bold',
    color: color.lightTheme.text,
    paddingBottom: spacing[2],
  } as ViewStyle,
  AUTHORS:{
    fontSize: typography.bodySmall.fontSize,
    color: color.lightTheme.text,
    fontWeight: 'bold',
  } as TextStyle,
  STATUS:{
    fontSize: typography.bodySmall.fontSize,
    color: color.lightTheme.text,
    fontWeight: 'bold',
  } as TextStyle,
  DESCRIPTION_CONTAINER:{
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    marginHorizontal: spacing[4],
    alignItems: 'center',
    marginTop: 10,
    position: 'relative', // To allow gradient overlay
    backgroundColor: color.lightTheme.third,
    borderRadius: radius[3],
    //marginHorizontal: spacing[4],
  },
  DESCRIPTION:{
    paddingVertical: spacing[3],
    fontSize: 14,
    color: color.lightTheme.text,
  },
  GRADIENT:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(254,242,229,0.8)',
    borderRadius: radius[3],
  },
  TOGGLE_BUTTON_TEXT:{
    fontSize: 14,
    fontWeight: 'bold',
    color: color.lightTheme.text,
  },
  LOADING_CONTAINER: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  } as ViewStyle,
 
  CATEGORIES_CONTAINER:{
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    alignItems: "flex-start", // Đảm bảo container co lại để phù hợp với nội dung
    justifyContent: "flex-start", // Đảm bảo container co lại để phù hợp với nội dung
        
    marginHorizontal: spacing[4],
    //alignItems: 'center',
  },
  CATEGORY_LABEL:{
    borderWidth: 1.2,
    borderColor: color.lightTheme.boder,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  CATEGORY_TEXT:{
    fontSize: 12,
    color: color.lightTheme.text,
  },
  LOADING: {} as TextStyle,
};

export const stylePresets = {
  [NovelDetailPresets.default]: { ...DEFAULT_STYLE },
};

export type INovelDetailPresets = keyof typeof NovelDetailPresets;
