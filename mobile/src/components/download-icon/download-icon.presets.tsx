import { ViewStyle, TextStyle } from "react-native";

export const DownloadIconPresets = {
    default: "default",
    };

const DEFAULT_STYLE = {
};

export const stylePresets = {
    [DownloadIconPresets.default]: DEFAULT_STYLE,
};

export type IDownloadIconStylePresets = keyof typeof stylePresets;