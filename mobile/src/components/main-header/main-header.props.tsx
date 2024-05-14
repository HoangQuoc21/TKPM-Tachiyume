//Import needed librairies here
import { StyleProp, ViewStyle } from "react-native"
//Import the presets interface
import { IMainHeaderPresets } from "./main-header.presets"

//Define the different props for the logo component
export interface MainHeaderProps {
    //The different props for the logo component go here
    preset?: IMainHeaderPresets
    title: string
}