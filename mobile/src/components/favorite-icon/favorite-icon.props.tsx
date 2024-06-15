import { StyleProp, ViewStyle, TextStyle } from "react-native";
import { IFavoriteIconStylePresets } from "./favorite-icon.presets";

export interface FavoriteIconProps {
    style?: StyleProp<ViewStyle>;
    preset?: IFavoriteIconStylePresets;
    value: boolean;
    onPress?: () => void;
}
