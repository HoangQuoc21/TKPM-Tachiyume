import * as React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { useToast } from "react-native-toast-notifications";
import { observer } from "mobx-react-lite";
import { flatten } from "ramda";
import { HistoryChapterListProps } from "./history-chapter-list.props";
import { stylePresets } from "./history-chapter-list.presets";
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
import { HistoryChapterListItem } from "../history-chapter-list-item/history-chapter-list-item";
import { translate } from "../../i18n";

// Import the models
import Novel from "../../models/novel";
import Chapter from "../../models/chapter";
import { color, iconSize } from "../../theme";
import { VectorIcon } from "../vector-icon/vector-icon";

// Import the type
import { HistoryChapterListSaveType } from "../../types";

// Import the context
import { HistoryChapterListContext } from "../../providers/history-chapter-list-provider";

export const HistoryChapterList = observer(function NovelList(props: HistoryChapterListProps) {
  const { preset = "default", style: styleOverride, ...rest } = props;

  const containerStyles = flatten([
    stylePresets[preset].CONTAINER,
    styleOverride,
  ]);
  const searchBarContainerStyles = flatten([
    stylePresets[preset].SEARCH_BAR_CONTAINER,
  ]);
  const searchBarStyles = flatten([stylePresets[preset].SEARCH_BAR]);
  const listContainerStyles = flatten([stylePresets[preset].LIST_CONTAINER]);
  const titleContainerStyles = flatten([stylePresets[preset].TITLECONTAINER]);
  const titleStyles = flatten([stylePresets[preset].TITLE]);
  const emptyContainerStyles = flatten([stylePresets[preset].EMPTY_CONTAINER]);
  const emptyTextStyles = flatten([stylePresets[preset].EMPTY_TEXT]);
  const loadingContainerStyles = flatten([
    stylePresets[preset].LOADING_CONTAINER,
  ]);
  const loadingStyles = flatten([stylePresets[preset].LOADING]);

  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<HistoryChapterListSaveType[]>([]);

  const [historyChapterList, addHistoryChapterToStorage] = useContext(HistoryChapterListContext);

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

  useEffect(() => {
    if (historyChapterList.length == 0) {
      setIsEmpty(true);
    } else {
      setFilteredData(historyChapterList);
      setIsEmpty(false);
    }
    setLoading(false);
  }, [historyChapterList]);

  const handleSearch = (text: string) => {
    setSearch(text);
    setIsSearch(true);
    if (text) {
      const filterChapterList = historyChapterList.filter((item: HistoryChapterListSaveType) => {
        const itemData = item.chapter.title.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(filterChapterList);
    } else {
      setIsSearch(false);
      setFilteredData(historyChapterList);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredData(historyChapterList);
    setIsSearch(false);
  };

  const renderHeader = () => {
    return (
      <Row style={searchBarContainerStyles}>
        <Column style={{ flex: 9 }}>
          <TextInput
            ref={textInputRef}
            style={searchBarStyles}
            placeholder="Search"
            value={search}
            onChangeText={(text) => handleSearch(text)}
          />
        </Column>
        <Column style={{ flex: 1 }}>
          {isSearch ? (
            <TouchableOpacity onPress={clearSearch}>
              <VectorIcon
                name={"close-outline"}
                color={color.lightTheme.accent}
                size={iconSize.medium}
              />
            </TouchableOpacity>
          ) : (
            <VectorIcon
              name={"search-outline"}
              color={color.lightTheme.accent}
              size={iconSize.medium}
            />
          )}
        </Column>
      </Row>
    );
  };

  const renderEmpty = () => {
    return (
      <Column style={emptyContainerStyles}>
        <Text style={emptyTextStyles}>{translate("novelListScreen.empty")}</Text>
      </Column>
    );
  };

 

  const renderItem = (item: HistoryChapterListSaveType) => {
    return <HistoryChapterListItem chapter={item.chapter} novel={item.novel} source={item.source}/>;
  };

  const renderHistoryList = () => {
    return (
      <FlatList
        data={filteredData}
        renderItem={({ item }) => renderItem(item)}
        //keyExtractor={(item) => item.chapter.id.toString()}
        showsVerticalScrollIndicator={true}
      />
    );
  };

  const renderBody = () => {
    return (
      <Column style={listContainerStyles}>
        {isEmpty ? LoadingCircle() : renderHistoryList()}
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
    <Column style={containerStyles}>
      {renderHeader()}
      {renderBody()}
      {loading && <LoadingCircle />}
    </Column>
  );
});
