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
    alignItems: 'center',
    
    
  } as ViewStyle, 
  THUMBNAIL:{
    flex: 30,
    width: "100%",
    height: 150,
    resizeMode: 'cover',
    marginRight: spacing[3],
    borderRadius: radius[4],
    borderColor: color.ligthTheme.secondary,
    borderWidth: 2, // Thêm border width
  },
  DETAILS:{
    flex: 70,
  },
  TITLE:{
    fontSize: typography.bodyLarge.fontSize,
    fontWeight: 'bold',
    color: color.ligthTheme.text,
  },
  AUTHORS:{
    fontSize: typography.bodySmall.fontSize,
    color: color.ligthTheme.text,
  },
  STATUS:{
    fontSize: typography.bodySmall.fontSize,
    color: color.ligthTheme.text,
  },
  DESCRIPTION_CONTAINER:{
    flexDirection: 'row',
    paddingHorizontal: spacing[4],
    marginHorizontal: spacing[4],
    alignItems: 'center',
    marginTop: 10,
    position: 'relative', // To allow gradient overlay
    backgroundColor: color.ligthTheme.third,
    borderRadius: radius[3],
    //marginHorizontal: spacing[4],
  },
  DESCRIPTION:{
    paddingVertical: spacing[3],
    fontSize: 14,
    color: color.ligthTheme.text,
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
    color: color.ligthTheme.text,
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
    borderColor: color.ligthTheme.boder,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  CATEGORY_TEXT:{
    fontSize: 12,
    color: color.ligthTheme.text,
  },
  LOADING: {} as TextStyle,
};

export const stylePresets = {
  [NovelDetailPresets.default]: { ...DEFAULT_STYLE },
};

export type INovelDetailPresets = keyof typeof NovelDetailPresets;
