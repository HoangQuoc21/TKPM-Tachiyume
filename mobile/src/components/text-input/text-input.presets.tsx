import { ViewStyle, TextStyle } from "react-native";
import { color, radius, spacing } from "../../theme";

export const TextInputPresets = {
    default: "default",
}

const DEFAULT_STYLE = {
    INPUT_CONTAINER: {
        height: 50,
        backgroundColor: color.lightTheme.primary,
        borderColor: color.lightTheme.boder,
        borderWidth: 1,
        borderRadius: radius[6],
        paddingHorizontal: spacing[3],
        color: color.lightTheme.text,
        alignItems: 'center',
        gap: spacing[1],
    } as ViewStyle,
    INPUT: {
        flex: 9,
    } as TextStyle,
    CLEAR_TEXT_BUTTON: {
        flex: 1
    } as TextStyle,
}

export const stylePresets = {
    [TextInputPresets.default]: { ...DEFAULT_STYLE },
}

export type ITextInputPresets = keyof typeof stylePresets