import { StyleProp, ViewStyle } from "react-native";
import { NovelListItemPresets } from "./novel-list-item.presets";
import Novel from "../../models/novel";
import Source from "../../models/sources/source";

export interface NovelListItemProps {
  style?: StyleProp<ViewStyle>;
  preset?: NovelListItemPresets;
  novel: Novel;
  source: Source;
}
