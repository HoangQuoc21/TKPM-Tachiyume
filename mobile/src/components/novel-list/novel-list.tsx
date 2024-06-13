import * as React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { useToast } from "react-native-toast-notifications";
import { observer } from "mobx-react-lite";
import { flatten } from "ramda";
import { NovelListProps } from "./novel-list.props";
import { stylePresets } from "./novel-list.presets";
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
import { NovelListItem } from "../novel-list-item/novel-list-item";
import { translate } from "../../i18n";

// Import the models
import Novel from "../../models/novel";
import { color, iconSize } from "../../theme";
import { VectorIcon } from "../vector-icon/vector-icon";

import { SourcePlugin } from '../../factories/source-plugin';
import Source from "../../models/sources/source";
import AllNovel from "../../models/sources/source-one";


export const NovelList = observer(function NovelList(props: NovelListProps) {
  const { preset = "default", style: styleOverride, source, ...rest } = props;

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
  const filterButtonStyles = flatten([stylePresets[preset].FILTER_BUTTON]);
  const selectFilterButtonStyles = flatten([stylePresets[preset].SELECTED_FILTER_BUTTON]);
  const filterTextStyles = flatten([stylePresets[preset].FILTER_BUTTON_TEXT]);
  const loadingContainerStyles = flatten([
    stylePresets[preset].LOADING_CONTAINER,
  ]);
  const loadingStyles = flatten([stylePresets[preset].LOADING]);

  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const [novelList, setNovelList] = useState<Novel[]>([]);

  const [isSearch, setIsSearch] = useState(false);
  const [foundNovels, setFoundNovels] = useState(true);
  const [search, setSearch] = useState("");
  const [searchedNovelList, setSearchedNovelList] = useState([]);

  // Temporary save the source id here
  const [sourceId, setSourceId] = useState(0);

  // Change color for filter
  const [selectedFilter, setSelectedFilter] = useState(null);

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

  const initNovelList = async (source) => {
    try {
      const novelSource = await SourcePlugin.createSource(source.id);
      console.log("Novel Source", novelSource)
      setSourceId(source.id);

      const novels = await novelSource.findNovelsByPage(1);
      console.log("Novel list", novelList)
      novels.map((novel, index) => {
        novel.id = `${source.id}-${index + 1}`; // Generate a unique key combining source id and index
      });

      setNovelList(novels);
    } catch (error) {
      console.error('Error finding novels by page:', error);
    }
  };

  useEffect(() => {
    initNovelList(source);

  }, [source]);

  useEffect(() => {
    if (novelList.length == 0) {
      setIsEmpty(true);
    } else {
      setSearchedNovelList(novelList);
      setIsEmpty(false);
    }
    setLoading(false);
  }, [novelList]);

  const handleSearch = async () => {
    const novelSource = await SourcePlugin.createSource(sourceId);
    const searchQuery = search;

    setIsSearch(true);
    if (searchQuery) {

      const searchNovels = await novelSource.searchNovels(searchQuery);
      if (!searchNovels) {
        setIsEmpty(true);
        setFoundNovels(false);
        setSearchedNovelList([]);
      } else {
        setFoundNovels(true);
        // Append new id to novels
        searchNovels.map((novel, index) => {

          novel.id = `s-${sourceId}-${index + 1}`; // Generate a unique key combining source id and index
        });

        setSearchedNovelList(searchNovels);
      }

    } else {
      setIsSearch(false);
      setSearchedNovelList(novelList);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSearchedNovelList(novelList);
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
            onChangeText={(text) => setSearch(text)}
            onSubmitEditing={handleSearch}
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
  const renderFilterButtons = () => {

    const filters = [
      "filterNovels.popular",
      "filterNovels.trending",
      "filterNovels.latest",
      "filterNovels.completed",
      "filterNovels.More"
    ];

    const handleFilterNovels = async (filter) => {
      let filteredNovels = [];
      // Temporary set page number here
      let page = 1;
      const novelSource = await SourcePlugin.createSource(sourceId);
      // Pass the bland filter to the source 
      filteredNovels = await novelSource.findNovelsByFilter(filter, page);

      // Append new id to novels
      filteredNovels.map((novel, index) => {
        novel.id = `f-${sourceId}-${index + 1}`; // Generate a unique key combining source id and index
      });

      setSearchedNovelList(filteredNovels);
      setSelectedFilter(filter); // Set the selected filter

    };

    return (
      <Row style={titleContainerStyles}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={filter}
            onPress={() => handleFilterNovels(filter)}
            style={[
              filterButtonStyles,
              index === 0 && { marginLeft: 20 },
              selectedFilter === filter && selectFilterButtonStyles
            ]}
          >
            <Text style={filterTextStyles}>
              {translate(filter)}
            </Text>
          </TouchableOpacity>
        ))}
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




  const renderItem = (novel: Novel) => {
    return <NovelListItem novel={novel} source={source} favorite={novel.isFavorite} />;
  };

  const renderNovelList = () => {
    return (
      <FlatList
        data={searchedNovelList}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={true}
      />
    );
  };

  const renderBody = () => {
    return (
      <Column style={listContainerStyles}>
        {isEmpty && !foundNovels ? renderEmpty() : null}
        {isEmpty && foundNovels ? LoadingCircle() : renderNovelList()}

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
      {renderFilterButtons()}
      {renderBody()}
      {loading && <LoadingCircle />}
    </Column>
  );
});
