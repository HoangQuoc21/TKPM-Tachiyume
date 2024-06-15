import { ViewStyle, TextStyle } from "react-native";
import { color, radius, spacing, typography } from "../../theme";


export const ExportChapterPresets = {
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
        backgroundColor: color.lightTheme.third,
        borderRadius: radius[7],
        width: '85%',
        padding: spacing[5],
        gap: spacing[3],
    } as ViewStyle,
    TITLE: {
        color: color.lightTheme.text,
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
        color: color.lightTheme.accentThird,
        fontWeight: 'bold',
    } as TextStyle,
}

export const stylePresets = {
    [ExportChapterPresets.default]: { ...DEFAULT_STYLE },
}

export type IExportChapterPresets = keyof typeof ExportChapterPresets