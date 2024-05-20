import { ViewStyle, TextStyle } from "react-native";

import { color, metric, radius, spacing, typography, shadow } from '../../theme'

export const SourceListPresets = {
    default: "default",
}

const DEFAULT_STYLE = {
    CONTAINER: {
        flex: 1,
    
    } as ViewStyle,
    SEARCH_BAR_CONTAINER: {
        flex: 1,
        //backgroundColor: "red",
    } as ViewStyle,
    SEARCH_BAR: {

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

}

export const stylePresets = {
    [SourceListPresets.default]: { ...DEFAULT_STYLE },
}

export type ISourceListPresets = keyof typeof SourceListPresets