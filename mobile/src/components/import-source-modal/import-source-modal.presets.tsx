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