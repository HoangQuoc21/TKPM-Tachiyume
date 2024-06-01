//Import needed librairies here
import { ViewStyle, TextStyle } from "react-native"

//Import the different themes
import {color, metric, spacing, typography} from '../../theme'


//Export the different presets for the logo component
export const HeaderPresets = {
    default: "default",
    //Other presets for the logo component go down here
}

//Export the different styles for the logo component
const DEFAULT_STYLE = {
    ROOT: {
        backgroundColor: color.ligthTheme.primary,
        height: 'auto', 
        marginTop: metric.statusBarHeight,
        padding: spacing[2],
        gap: spacing[1],
    } as ViewStyle,
    LEFT_CONTAINER: {
        flex:1,
    } as ViewStyle,
    CONTENT_CONTAINER: {
        flex: 8,
    } as ViewStyle,
    RIGHT_CONTAINER: {
        flex: 1,
    } as ViewStyle,
    TITLE_NORMAL: {
        ...typography.displayLarge,
        fontWeight: 'bold', 
    } as TextStyle,
    TITLE_WITH_SUBTITLE:{
        ...typography.titleLarge,
        fontWeight: 'bold', 
        
    } as TextStyle,
    SUBTITLE:{
        ...typography.bodySmall,
        
    } as TextStyle,
}
//Other presets for the logo component go down here

//Export the different props for the logo component
export const stylePresets = {
    [HeaderPresets.default]: { ...DEFAULT_STYLE },
    //Other presets for the logo component go down here
}

//Export the different props for the logo component
export type IHeaderPresets = keyof typeof HeaderPresets