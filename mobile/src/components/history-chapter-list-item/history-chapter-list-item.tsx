import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { flatten } from "ramda";
import { IHistoryChapterListItemProps } from "./history-chapter-list-item.props";
import { stylePresets } from "./history-chapter-list-item.preset"

import { Text, Image, TouchableOpacity } from "react-native";
import { Column } from "../column/column";
import { Row } from "../row/row";

import { ChapterScreenName } from "../../screens/chapter/chapter-screen";

import { navigate } from "../../navigators/navigation-utilities";

export const HistoryChapterListItem = observer(function ChapterListItem(props: IHistoryChapterListItemProps) {
  const { preset = "default", chapter: chapter, novel: novel, source: source } = props;

  const rootStyle = flatten([stylePresets[preset].ROOT]);
  const novelImageStyle = flatten([stylePresets[preset].NOVEL_IMAGE]);
  const novelTitleStyle = flatten([stylePresets[preset].NOVEL_TITLE]);
  const chapterContainerStyle = flatten([stylePresets[preset].CHAPTER_CONTAINER]);
  const chapterTitleStyle = flatten([stylePresets[preset].CHAPTER_TITLE]);

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

  const renderImage = () => {
    return (
        <Image
          resizeMode="cover"
          source={{ uri: novel.thumbnail }}
          style={novelImageStyle}
        />
    );
  }

  const renderChapterInfo = () => {
    return (
      <Column style={chapterContainerStyle}>
        <Text style={novelTitleStyle}>
          {novel.title}
        </Text>
        <Text numberOfLines={3} style={chapterTitleStyle}>{chapter.title}</Text>
      </Column>
    );
  }

  return (
    <TouchableOpacity style={rootStyle} onPress={handlePress}>
        {renderImage()}
        {renderChapterInfo()}
    </TouchableOpacity>
  );
});
