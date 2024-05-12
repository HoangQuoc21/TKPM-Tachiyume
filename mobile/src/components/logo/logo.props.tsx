//Import needed librairies here
import { ImageStyle, StyleProp, ViewStyle } from "react-native"
//Import the presets interface
import { ILogoPresets } from "./logo.presets"

//Define the different props for the logo component
export interface LogoProps{
    //The different props for the logo component go here
    preset?: ILogoPresets
    overridStyle?: StyleProp<ViewStyle>
    overrideImageStyle?: StyleProp<ImageStyle>
}