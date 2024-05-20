import { StyleProp, ViewStyle } from "react-native";
import { SourceListItemPresets } from "./source-list-item.presets";
import Source from '../../models/sources/source'

export interface SourceListItemProps {
    style?: StyleProp<ViewStyle>
    preset?: SourceListItemPresets
    item: Source,
}