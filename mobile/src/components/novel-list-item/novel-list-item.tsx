import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { flatten } from "ramda";
import { NovelListItemProps } from "./novel-list-item.props";
import { stylePresets } from "./novel-list-item.presets";

import { Text, Image, TouchableOpacity } from "react-native";
import { Column } from "../column/column";

import { NovelDetailScreenName } from "../../screens/novel-detail/novel-detail-screen";

import { navigate } from "../../navigators/navigation-utilities";
import { VectorIcon } from "../vector-icon/vector-icon";
import { color, iconSize, spacing } from "../../theme";

export const NovelListItem = observer(function NovelListItem(
  props: NovelListItemProps
) {
  const { preset = "default", style: styleOverride, novel: novel, source: source, favorite } = props;

  const containerStyles = flatten([
    stylePresets[preset].CONTAINER,
    styleOverride,
  ]);
  const imageStyles = flatten([stylePresets[preset].IMAGE]);
  const textContainerStyles = flatten([stylePresets[preset].TEXT_CONTAINER]);
  const textStyles = flatten([stylePresets[preset].TEXT]);
  const favoriteIconStyle = flatten([stylePresets[preset].FAVORITE_ICON]);

  const handlePress = () => {
    navigate(NovelDetailScreenName as never, {
      header: novel.title,
      data: {
        source: source,
        novel: novel,
      },
    });
  };

  return (
    <TouchableOpacity style={containerStyles} onPress={handlePress}>
      <Image
        source={{ uri: novel.thumbnail }}
        style={imageStyles}
        resizeMode="cover"
      />
      <Column style={textContainerStyles}>
        <Text style={textStyles}>{novel.title}</Text>
      </Column>
      {favorite && 
        <VectorIcon
          name={"heart"}
          size={iconSize.medium}
          style={favoriteIconStyle}
          color={color.common.pink}
        />
      }
    </TouchableOpacity>
  );
});
