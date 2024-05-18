//Import needed librairies here
import { ViewStyle, ImageStyle } from "react-native"


//Export the different presets for the logo component
export const LogoPresets = {
    default: "default",
    //Other presets for the logo component go down here
}

//Export the different styles for the logo component
const DEFAULT_STYLE = {
    CONTAINER: {
        flex:1,
        alignItems:'center',
    } as ViewStyle ,
    IMAGE: {
        resizeMode: "contain",
        height: 200,
        width: 200,
    } as ImageStyle,
}
//Other presets for the logo component go down here

//Export the different props for the logo component
export const stylePresets = {
    [LogoPresets.default]: { ...DEFAULT_STYLE },
    //Other presets for the logo component go down here
}

//Export the different props for the logo component
export type ILogoPresets = keyof typeof LogoPresets