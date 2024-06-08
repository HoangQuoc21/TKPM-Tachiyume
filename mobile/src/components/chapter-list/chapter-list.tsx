import * as React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { useToast } from "react-native-toast-notifications";
import { observer } from "mobx-react-lite";
import { flatten } from "ramda";
import { ChapterListProps } from "./chapter-list.props";
import { stylePresets } from "./chapter-list.presets";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from "react-native";

import { Column } from "../column/column";
import { Row } from "../row/row";
import { ChapterListItem } from "../chapter-list-item/chapter-list-item";
import { translate } from "../../i18n";

// Import the models
import Chapter from "../../models/chapter";
import { color, iconSize, spacing } from "../../theme";
import { VectorIcon } from "../vector-icon/vector-icon";

import { SourceFactory } from '../../factories/source-factory';
import Source from "../../models/sources/source";
import SourceOne from "../../models/sources/source-one";


export const ChapterList = observer(function ChapterList(props: ChapterListProps) {
  const { preset = "default", style: styleOverride, source, novel, ...rest } = props;

  const containerStyles = flatten([
    stylePresets[preset].CONTAINER,
    styleOverride,
  ]);

  const listContainerStyles = flatten([stylePresets[preset].LIST_CONTAINER]);
  const titleContainerStyles = flatten([stylePresets[preset].TITLE_CONTAINER]);
  const titleStyles = flatten([stylePresets[preset].TITLE]);

  const loadingContainerStyles = flatten([
    stylePresets[preset].LOADING_CONTAINER,
  ]);
  const loadingStyles = flatten([stylePresets[preset].LOADING]);

  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const [chapterList, setChapterList] = useState<Chapter[]>([]);


  const [filteredData, setFilteredData] = useState(chapterList);

  // Add this ref to clear focus on text input when press back button
  const textInputRef = useRef(null);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (textInputRef.current && textInputRef.current.isFocused()) {
          textInputRef.current.blur();
          return true; // prevent default behavior (exit app)
        }
        return false; // allow default behavior
      }
    );
    return () => backHandler.remove();
  }, []);

  const initChapterList = async (source) => {
    //console.log(`Source ID in Chapter List: ${source.id}`);

    const chapterSource = SourceFactory.createSource(source.id);

    await chapterSource.findChaptersByNovel(novel).then((chapters) => {

      const tempChapterList = [];
      chapters.slice().reverse().forEach((chapter, index) => {
        tempChapterList.push({
          ...chapter,
          id: chapters.length - index // Thêm id cho từng chương (đảo ngược)
        });
      });

      setChapterList(tempChapterList);

    }).catch((error) => {
      console.error('Error finding chapters by page:', error);
    });
  };

  useEffect(() => {
    initChapterList(source);
  }, [source]);

  useEffect(() => {
    if (chapterList.length == 0) {
      setIsEmpty(true);
    } else {
      setFilteredData(chapterList);
      setIsEmpty(false);
    }
    setLoading(false);
  }, [chapterList]);

  const renderItem = (chapter: Chapter) => {
    return <ChapterListItem chapter={chapter} novel={novel} source={source} />;
  };

  const renderChapterList = () => {
    return (
      <View>
        <Row style={titleContainerStyles}>
          <Column style={{ flex: 4, borderColor: color.lightTheme.fourth, borderBottomWidth: 1 }}>
            <Text style={titleStyles}>{chapterList.length} {translate("novelDetailScreen.chapters")}</Text>
          </Column>
          <Column style={{ flex: 6 }} />
        </Row>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
        />
      </View>

    );
  };

  const renderBody = () => {
    return (
      <Column style={listContainerStyles}>
        {isEmpty ? LoadingCircle() : renderChapterList()}
      </Column>
    );
  };

  const LoadingCircle = () => {
    return (
      <View style={loadingContainerStyles}>
        <ActivityIndicator size="large" color={color.common.blue} />
      </View>
    );
  };

  return (
    <View>
      {renderBody()}
      {loading && <LoadingCircle />}
    </View>
  );
});
