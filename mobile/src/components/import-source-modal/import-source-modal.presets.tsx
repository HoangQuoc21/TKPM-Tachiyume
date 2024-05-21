import { ViewStyle, TextStyle } from "react-native";
import { color, radius, spacing, typography } from "../../theme";


export const ImportSourceModalPresets = {
    default: "default",
}

const DEFAULT_STYLE = {
    OVERLAY_CONTAINER: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.common.overlay, // This creates the overlay effect
    } as ViewStyle,
    MODAL_CONTAINER: {
        backgroundColor: color.ligthTheme.third,
        borderRadius: radius[7],
        width: '85%',
        padding: spacing[5],
        gap: spacing[3],
    } as ViewStyle,
    TITLE: {
        color: color.ligthTheme.text,
        ...typography.titleLarge
    } as TextStyle,
    INPUT_CONTAINER:{
        height: 50,
        backgroundColor: color.ligthTheme.primary,
        borderColor: color.ligthTheme.boder,
        borderWidth: 1,
        borderRadius: radius[6],
        paddingHorizontal: spacing[3],
        color: color.ligthTheme.text,
        alignItems: 'center',
        gap: spacing[1],
    } as TextStyle,
    INPUT:{
        flex: 9,
    },
    CLEAR_TEXT_BUTTON: {
        flex: 1
    },
    BUTTON_CONTAINER: {
        justifyContent: 'flex-end',
        gap: spacing[3],
    } as ViewStyle,
    BUTTON: {
        
    } as ViewStyle,
    BUTTON_TEXT: {
        ...typography.bodyLarge,
        color: color.ligthTheme.accentThird,
        fontWeight: 'bold',
    } as TextStyle,
}

export const stylePresets = {
    [ImportSourceModalPresets.default]: { ...DEFAULT_STYLE },
}

export type IImportSourceModalPresets = keyof typeof ImportSourceModalPresets