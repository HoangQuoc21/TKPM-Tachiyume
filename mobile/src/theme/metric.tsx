import { Dimensions } from "react-native"
import Constants from "expo-constants"

// Metric help to get the screen size (height, width) and status bar height
export const metric = {
  screenHeight: Dimensions.get("window").height,
  screenWidth: Dimensions.get("window").width,
  statusBarHeight: Constants.statusBarHeight,
}
