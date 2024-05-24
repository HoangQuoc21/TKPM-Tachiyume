import { ViewStyle, TextStyle } from "react-native";

import {
    color,
    metric,
    radius,
    spacing,
    typography,
    shadow,
} from "../../theme";

export const SourceListPresets = {
    default: "default",
};

const DEFAULT_STYLE = {
    CONTAINER: {
        flex: 1,
    } as ViewStyle,
    SEARCH_BAR_CONTAINER: {
        flex: 1,
        marginHorizontal: spacing[4],
        marginVertical: spacing[2],
        borderRadius: radius[7],
        alignContent: "center",
        backgroundColor: color.ligthTheme.fourth,
        paddingHorizontal: spacing[2],
        marginBottom: spacing[1],
        alignItems: "center",
    } as ViewStyle,
    SEARCH_BAR: {
        marginHorizontal: spacing[1],
        alignContent: "center",
        paddingHorizontal: spacing[2],
        fontSize: typography.bodySmall.fontSize,
    } as TextStyle,
    SEARCH_BAR_ITEM: {
        padding: spacing[3],
        borderBottomWidth: 1,
        borderBottomColor: color.common.black
    } as ViewStyle,
    SEARCH_BAR_ITEM_TEXT: {
        ...typography.bodyLarge
    } as TextStyle,
    LIST_CONTAINER: {
        flex: 9,
        padding: spacing[3],
        gap: spacing[3],
    } as ViewStyle,
    TITLECONTAINER: {

    } as ViewStyle,
    TITLE: {
        ...typography.titleLarge,
        fontWeight: 'bold',
    } as TextStyle,
    EMPTY_CONTAINER: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    EMPTY_TEXT: {
        ...typography.titleLarge,
    } as TextStyle,
    LOADING_CONTAINER: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
    } as ViewStyle,
    LOADING: {

    } as TextStyle,
    CLEAR_BUTTON: {
        backgroundColor: color.ligthTheme.accentSecondary,
        padding: spacing[3],
        borderRadius: radius[3],
        ...shadow.default
    } as ViewStyle,
    CLEAR_BUTTON_TEXT: {
        fontWeight: 'bold',
    } as TextStyle
}

export const stylePresets = {
    [SourceListPresets.default]: { ...DEFAULT_STYLE },
};

export type ISourceListPresets = keyof typeof SourceListPresets;