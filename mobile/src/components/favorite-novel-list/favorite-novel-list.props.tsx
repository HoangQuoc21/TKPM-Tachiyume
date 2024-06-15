import { StyleProp, ViewStyle } from "react-native";
import { IFavoriteIconStylePresets } from "../favorite-icon/favorite-icon.presets";
import Source from "../../models/sources/source";

export interface FavoriteNovelListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * One of the different types of SourceList presets.
   */
  preset?: IFavoriteIconStylePresets;

}
