import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { flatten } from "ramda";
import { ChapterListItemProps } from "./chapter-list-item.props";
import { stylePresets } from "./chapter-list-item.presets";

import { Text, Image, TouchableOpacity } from "react-native";
import { Column } from "../column/column";

import { ChapterScreenName } from "../../screens/chapter/chapter-screen";

import { navigate } from "../../navigators/navigation-utilities";

import { DownloadIcon } from "../download-icon/download-icon";
import { View } from "../view/view";



export const ChapterListItem = observer(function ChapterListItem(props: ChapterListItemProps) {
  const { preset = "default", style: styleOverride, chapter: chapter, novel: novel, source: source } = props;

  const containerStyles = flatten([
    stylePresets[preset].CONTAINER,
    styleOverride,
  ]);

  const iconContainerStyles = flatten([stylePresets[preset].DOWNLOAD_ICON_CONTAINER]);

  const textStyles = flatten([stylePresets[preset].TEXT]);

  const handleDownload = () => {
    console.log('Download clicked');
  }

  const handlePress = () => {
    navigate(ChapterScreenName, {
      title: novel.title,
      subTitle: chapter.title,
      data: {
        source: source,
        chapter: chapter,
        novel: novel,
      },
    });
  };

  return (
    <TouchableOpacity style={containerStyles} onPress={handlePress}>
      <Column style={textStyles}>
        <Text numberOfLines={1} style={textStyles}>{chapter.title}</Text>
      </Column>
      <Column>
        <View style={iconContainerStyles}>
          <DownloadIcon onPress={handleDownload} />

        </View>
      </Column>
    </TouchableOpacity>
  );
});
