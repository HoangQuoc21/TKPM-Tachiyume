import * as React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { useToast } from "react-native-toast-notifications";
import { observer } from "mobx-react-lite";
import { flatten } from "ramda";
import { NovelDetailProps } from "./novel-detail.props";
import { stylePresets } from "./novel-detail.presets";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

import { Column } from "../column/column";

import { translate } from "../../i18n";

import { FavoriteIcon } from "../favorite-icon/favorite-icon";

// Import the models
import Novel from "../../models/novel";
import { color, iconSize } from "../../theme";

import { SourceFactory } from '../../factories/source-factory';
import { ChapterList } from "../chapter-list/chapter-list";
import { ScrollView } from "react-native-gesture-handler";
import { Row } from "../row/row";
//import { LinearGradient } from 'expo-linear-gradient';

import { FavoriteNovelListContext } from "../../providers/favorite-novel-list-provider";

export const NovelDetail = observer(function NovelDetail(props: NovelDetailProps) {
  const { preset = "default", style: styleOverride, source, novel, ...rest } = props;

  const toast = useToast();
  const containerStyles = flatten([
    stylePresets[preset].CONTAINER,
    styleOverride,
  ]);

  const loadingContainerStyles = flatten([
    stylePresets[preset].LOADING_CONTAINER,
  ]);

  //Styles Details
  const containerDetailsStyles = flatten([stylePresets[preset].CONTAINER_DETAILS]);
  const thumbnailStyles = flatten([stylePresets[preset].THUMBNAIL]);
  const detailsStyles = flatten([stylePresets[preset].DETAILS]);
  const titleStyles = flatten([stylePresets[preset].TITLE]);
  const authorsStyles = flatten([stylePresets[preset].AUTHORS]);
  const statusStyles = flatten([stylePresets[preset].STATUS]);

  //Styles Description
  const descriptionContainerStyles = flatten([stylePresets[preset].DESCRIPTION_CONTAINER]);
  const descriptionStyles = flatten([stylePresets[preset].DESCRIPTION]);
  const gradientStyles = flatten([stylePresets[preset].GRADIENT]);
  const toggleButtonTextStyles = flatten([stylePresets[preset].TOGGLE_BUTTON_TEXT]);

  //Styles Categories
  const categoriesContainerStyles = flatten([stylePresets[preset].CATEGORIES_CONTAINER]);
  const categoryLabelStyles = flatten([stylePresets[preset].CATEGORY_LABEL]);
  const categoryTextStyles = flatten([stylePresets[preset].CATEGORY_TEXT]);

  const [isEmpty, setIsEmpty] = useState(false);
  const [novelDetail, setNovelDetail] = useState<Novel | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [favoriteNovelList, addFavoriteNovelToStorage, removeFavoriteNovelFromStorage] = useContext(FavoriteNovelListContext);

  const initNovel = async (source) => {
    const novelSource = SourceFactory.createSource(source.id);

    await novelSource.findNovelDetails(novel).then((detail) => {
      setNovelDetail(detail);
    }).catch((error) => {
      console.error('Error finding novels by page:', error);
    });
  };

  useEffect(() => {
    initNovel(source);

  }, [source]);

  useEffect(() => {
    setIsEmpty(!novelDetail);
  }, [novelDetail]);

  const [isFavorite, setIsFavorite] = useState(novel.isFavorite);

  const onFavoriteIconPress = async () => {
    setIsFavorite(!isFavorite)
    if (!isFavorite) {
      addFavoriteNovelToStorage(novel, source);
    } else {
      removeFavoriteNovelFromStorage(novel);
    }
    toast.show(!isFavorite ? "Add to favorite" : "Remove from favorite", { type: "success" });
  }

  const renderDetails = () => {
    if (!novelDetail) {
      return null;
    }
    return (
      <View style={containerDetailsStyles}>
        <Image source={{ uri: novelDetail.thumbnail }} style={thumbnailStyles} resizeMode="contain" />
        <View style={detailsStyles}>
          <Text style={titleStyles}>{novelDetail.title}</Text>
          <Row alignItems="center">
            <Text style={authorsStyles}>{`${"Author: "}`}</Text>
            <Text>{`${novelDetail.authors.join(', ')}`}</Text>
          </Row>
          <Row alignItems="center">
            <Text style={authorsStyles}>{`${"Status: "}`}</Text>
            <Text>{`${novelDetail.status}`}</Text>
          </Row>
          <FavoriteIcon value={isFavorite} onPress={onFavoriteIconPress} />
        </View>
      </View>
    );
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = () => {
    if (!novelDetail) {
      return null;
    }
    return (

      <View style={descriptionContainerStyles}>
        <Text
          numberOfLines={isExpanded ? undefined : 4}
          style={descriptionStyles}
        >
          {novelDetail.description}
        </Text>
        <TouchableOpacity onPress={toggleExpand} style={gradientStyles}>
          <Text style={toggleButtonTextStyles}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      </View>

    );
  };

  const renderCategories = () => {
    if (!novelDetail || !novelDetail.category || novelDetail.category.length === 0) {
      return null;
    }
    return (
      <View style={categoriesContainerStyles}>
        {novelDetail.category.map((category, index) => (
          <View key={index} style={categoryLabelStyles}>
            <Text style={categoryTextStyles}>{category}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderChapterList = () => {
    return <ChapterList source={source} novel={novel} />;
  };


  const LoadingCircle = () => {
    return (
      <View style={loadingContainerStyles}>
        <ActivityIndicator size="large" color={color.common.blue} />
      </View>
    );
  };

  const renderCard = () => {
    return (
      <Column>

        {isEmpty ? LoadingCircle() : (
          <View>
            {renderDetails()}
            {renderDescription()}
            {renderCategories()}
            {renderChapterList()}
          </View>
        )}

      </Column>
    );
  };


  return (
    <Column style={containerStyles}>
      {renderCard()}
    </Column>
  );
});
