import { StyleProp, ViewStyle } from "react-native";
import { NovelListItemPresets } from "./novel-list-item.presets";
import Novel from "../../models/novel";

export interface NovelListItemProps {
  style?: StyleProp<ViewStyle>;
  preset?: NovelListItemPresets;
  item: Novel;
  favorite?: boolean 
}
