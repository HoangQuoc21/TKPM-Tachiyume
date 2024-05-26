import { ViewStyle, TextStyle } from "react-native";

import { color,shadow, radius } from "../../theme";


export const FloatingButtonPresets = {
    default: "default",
};

const DEFAULT_STYLE = {
    CONTAINER:{
        width: 60,
        height: 60,
        backgroundColor: color.ligthTheme.accentSecondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius[4],
        ...shadow.default,
        position: 'absolute',
        bottom: 70,
        right: 20,
    } as ViewStyle,
}

export const stylePresets = {
    [FloatingButtonPresets.default]: { ...DEFAULT_STYLE },
};

export type IFloatingButtonPresets = keyof typeof FloatingButtonPresets;