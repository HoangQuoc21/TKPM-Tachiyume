//Import needed librairies here
import { StyleProp, ViewStyle } from "react-native"
//Import the presets interface
import { IHeaderPresets } from "./header.presets"

//Define the different props for the logo component
export interface HeaderProps {
    //The different props for the logo component go here
    preset?: IHeaderPresets
    canGoBack?: boolean
    title?: string
    subtitle?: string
    rightElement?: any
}