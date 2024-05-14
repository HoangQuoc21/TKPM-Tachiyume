//Import needed librairies here
import { ViewStyle, TextStyle } from "react-native"

//Import the different themes
import {color, metric, spacing} from '../../theme'


//Export the different presets for the logo component
export const MainHeaderPresets = {
    default: "default",
    //Other presets for the logo component go down here
}

//Export the different styles for the logo component
const DEFAULT_STYLE = {
    CONTAINER: {
        backgroundColor: color.ligthTheme.primary,
        height: 'auto', 
        marginTop: metric.statusBarHeight
    } as ViewStyle,
    TITLE: {
        fontSize: 30, 
        fontWeight: 'bold', 
        padding: spacing[4], 
        paddingVertical: spacing[2]
    } as TextStyle,
}
//Other presets for the logo component go down here

//Export the different props for the logo component
export const stylePresets = {
    [MainHeaderPresets.default]: { ...DEFAULT_STYLE },
    //Other presets for the logo component go down here
}

//Export the different props for the logo component
export type IMainHeaderPresets = keyof typeof MainHeaderPresets