import { StyleProp, ViewStyle, TextStyle } from "react-native";
import { IDownloadIconStylePresets } from "./download-icon.presets";

export interface DownloadIconProps {
    style?: StyleProp<ViewStyle>;
    preset?: IDownloadIconStylePresets;
    onPress?: () => void;
}
