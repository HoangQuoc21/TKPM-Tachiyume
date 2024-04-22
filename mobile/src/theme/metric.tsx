import { Dimensions } from "react-native"
import Constants from "expo-constants"

//Hàm này trả về một object chứa thông tin về kích thước chiều cao và chiều rộng màn hình và thanh status bar
export const metric = {
  screenHeight: Dimensions.get("window").height,
  screenWidth: Dimensions.get("window").width,
  statusBarHeight: Constants.statusBarHeight,
}
