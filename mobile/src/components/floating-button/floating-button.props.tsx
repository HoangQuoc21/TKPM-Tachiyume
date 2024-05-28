import { StyleProp, ViewStyle } from "react-native";

import { IFloatingButtonPresets } from "./floating-button.presets";

export interface FloatingButtonProps {
    preset?: IFloatingButtonPresets;
    style?: StyleProp<ViewStyle>;
    icon: string;
    onPress?: () => void;
}