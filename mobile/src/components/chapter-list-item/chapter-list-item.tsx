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
import { VectorIcon } from "../vector-icon/vector-icon";
import { iconSize } from "../../theme";
import { ExportChapter } from "../export-chapter/export-chapter";
import { useState } from "react";

import { DownloadIcon } from "../download-icon/download-icon";
import { View } from "../view/view";



export const ChapterListItem = observer(function ChapterListItem(props: ChapterListItemProps) {
  const { preset = "default", style: styleOverride, chapter: chapter, novel: novel, source: source } = props;

  const containerStyles = flatten([
    stylePresets[preset].CONTAINER,
    styleOverride,
  ]);



  const textStyles = flatten([stylePresets[preset].TEXT]);
  const iconStyles = flatten([stylePresets[preset].ICON]);
  const textContainerStyles = flatten([stylePresets[preset].TEXT_CONTAINER]);
  const iconContainerStyles = flatten([stylePresets[preset].ICON_CONTAINER]);

  const [isExportVisible, setExportVisible] = useState(false);

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

  const handleDownload = () => {
    setExportVisible(true);
  };

  const handleCloseExport = () => {
    setExportVisible(false);
  };

  return (
    <>
  <TouchableOpacity style={containerStyles} onPress={handlePress}>
    <Column style={textContainerStyles}>
      <Text numberOfLines={1} style={textStyles}>{chapter.title}</Text>
    </Column>
    {preset === "default" && (
      <TouchableOpacity style={iconContainerStyles} onPress={handleDownload}>
        <VectorIcon name="arrow-down-circle" size={iconSize.medium} style={iconStyles} />
      </TouchableOpacity>
    )}
  </TouchableOpacity>
  {isExportVisible && (
    <ExportChapter
      preset="default"
      isVisible={isExportVisible}
      onClosePress={handleCloseExport}
      source={source}
      chapter={chapter}
    />
  )}
</>
  );
});
