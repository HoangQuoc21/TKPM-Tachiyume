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

import { SourceFactory } from '../../factories/source-factory';
import Source from "../../models/sources/source";
import SourceOne from "../../models/sources/source-one";


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
  const loadingContainerStyles = flatten([
    stylePresets[preset].LOADING_CONTAINER,
  ]);
  const loadingStyles = flatten([stylePresets[preset].LOADING]);

  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const [novelList, setNovelList] = useState<Novel[]>([]);
  
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(novelList);

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
    console.log(`Source ID: ${source.id}`); 
    
    const novelSource = SourceFactory.createSource(source.id);
  
    await novelSource.findNovelsByPage(1).then((novels) => {
      console.log(novels)
      
    
      
      novels.forEach((novel, index) => {
        novel.id = index + 1; //Add an id to the novel
        setNovelList((previousList) => [...previousList, novel]);

      })


    }).catch((error) => {
      console.error('Error finding novels by page:', error);
    });
  };

  useEffect(() => {
    initNovelList(source);
    
  }, [source]);

  useEffect(() => {
    if (novelList.length == 0) {
      setIsEmpty(true);
    } else {
      setFilteredData(novelList);
      setIsEmpty(false);
    }
    setLoading(false);
  }, [novelList]);

  const handleSearch = (text: string) => {
    setSearch(text);
    setIsSearch(true);
    if (text) {
      const filterNovelList = novelList.filter((item: Novel) => {
        const itemData = item.title.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(filterNovelList);
    } else {
      setIsSearch(false);
      setFilteredData(novelList);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredData(novelList);
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
                color={color.ligthTheme.accent}
                size={iconSize.medium}
              />
            </TouchableOpacity>
          ) : (
            <VectorIcon
              name={"search-outline"}
              color={color.ligthTheme.accent}
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

 

  const renderItem = (item: Novel) => {
    
    return <NovelListItem item={item} />;
  };

  const renderNovelList = () => {
    return (
      <FlatList
        data={filteredData}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={true}
      />
    );
  };

  const renderBody = () => {
    return (
      <Column style={listContainerStyles}>
        
        {isEmpty ? LoadingCircle() : renderNovelList()}
      
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
