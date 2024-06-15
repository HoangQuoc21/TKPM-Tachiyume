import { ViewStyle, TextStyle } from "react-native";

export const FavoriteIconPresets = {
    default: "default",
    };

const DEFAULT_STYLE = {
};

export const stylePresets = {
    [FavoriteIconPresets.default]: DEFAULT_STYLE,
};

export type IFavoriteIconStylePresets = keyof typeof stylePresets;