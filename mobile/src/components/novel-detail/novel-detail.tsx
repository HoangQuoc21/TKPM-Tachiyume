import * as React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { useToast } from "react-native-toast-notifications";
import { observer } from "mobx-react-lite";
import { flatten } from "ramda";
import { NovelDetailProps } from "./novel-detail.props";
import { stylePresets } from "./novel-detail.presets";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Image,
} from "react-native";

import { Column } from "../column/column";
import { Row } from "../row/row";

import { translate } from "../../i18n";

// Import the models
import Novel from "../../models/novel";
import { color, iconSize } from "../../theme";
import { VectorIcon } from "../vector-icon/vector-icon";

import { SourceFactory } from '../../factories/source-factory';

export const NovelDetail = observer(function NovelDetail(props: NovelDetailProps) {
  const { preset = "default", style: styleOverride, source, novel, ...rest } = props;

  const containerStyles = flatten([
    stylePresets[preset].CONTAINER,
    styleOverride,
  ]);
  
  const loadingContainerStyles = flatten([
    stylePresets[preset].LOADING_CONTAINER,
  ]);
  const loadingStyles = flatten([stylePresets[preset].LOADING]);

  const containerDetailsStyles = flatten([stylePresets[preset].CONTAINER_DETAILS]);
  const thumbnailStyles = flatten([stylePresets[preset].THUMBNAIL]);
  const detailsStyles = flatten([stylePresets[preset].DETAILS]);
  const titleStyles = flatten([stylePresets[preset].TITLE]);
  const authorsStyles = flatten([stylePresets[preset].AUTHORS]);
  const statusStyles = flatten([stylePresets[preset].STATUS]);

  const [isEmpty, setIsEmpty] = useState(false);
  const [novelDetail, setNovelDetail] = useState<Novel>();

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

  const initNovel = async (source) => {
    console.log(`Source ID in Novel-Detail: ${source.id}`); 
    
    const novelSource = SourceFactory.createSource(source.id);

    console.log(`Novel Name in Novel-Detail: ${novel.title}`); 
  
    await novelSource.findNovelDetails(novel).then((detail) => {
        
     //console.log(detail);
      setNovelDetail(detail);
      //console.log(novelDetail);

    }).catch((error) => {
      console.error('Error finding novels by page:', error);
    });
  };

  useEffect(() => {
    initNovel(source);
    
  }, [source]);

  useEffect(() => {
    if (!novelDetail) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    //setLoading(false);
  }, [novelDetail]);
  
  const renderDetails = () => {
    return (
    <View style={containerDetailsStyles}>
      <Image  source={{ uri: novelDetail.thumbnail }} style={thumbnailStyles} resizeMode="contain" />
      
      <View style={detailsStyles}>
        <Text style={titleStyles}>{novelDetail.title}</Text>
        <Text style={authorsStyles}>{novelDetail.authors.join(', ')}</Text>
        <Text style={statusStyles}>{novelDetail.status}</Text>
      </View>
    </View>
    );
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
        
        {isEmpty ? LoadingCircle() : renderDetails()}
      
      </Column>
    );
  };
  

  return (
    <Column style={containerStyles}>
      
      {/* {isEmpty ? LoadingCircle() : renderDetails()} */}

      {renderCard()}
      
      {/* {loading && <LoadingCircle />} */}
    </Column>
  );
});
