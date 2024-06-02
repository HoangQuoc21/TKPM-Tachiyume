import * as React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { useToast } from "react-native-toast-notifications";
import { observer } from "mobx-react-lite";
import { flatten } from "ramda";
import { ChapterContentProps } from "./chapter-content.props";
import { stylePresets } from "./chapter-content.presets";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from "react-native";

//import React, { useState, useRef } from 'react';
//import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import BottomSheet from '@gorhom/bottom-sheet';

import { Column } from "../column/column";
import { Row } from "../row/row";
import { ChapterListItem } from "../chapter-list-item/chapter-list-item";
import { translate } from "../../i18n";

// Import the models
import Chapter from "../../models/chapter";
import { color, iconSize} from "../../theme";
import { VectorIcon } from "../vector-icon/vector-icon";

import { SourceFactory } from '../../factories/source-factory';
import { ScrollView } from "react-native-gesture-handler";
import { Slider } from "../slider/slider";


export const ChapterContent = observer(function ChapterContent(props: ChapterContentProps) {
  const { preset = "default", style: styleOverride, source, novel, chapter, ...rest } = props;

  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chapterContent, setChapterContent] = useState<Chapter | null>(null);
  const [fontSize, setFontSize] = useState(15);
  const [fontFamily, setFontFamily] = useState('Roboto');
  const [lineHeight, setLineHeight] = useState(30);
  const [darkMode, setDarkMode] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);


  const containerStyles = flatten([stylePresets[preset].CONTAINER, styleOverride,]);
  const loadingContainerStyles = flatten([stylePresets[preset].LOADING_CONTAINER,]);
  const loadingStyles = flatten([stylePresets[preset].LOADING]);

  const styleTheme = darkMode ? stylePresets[preset].DARK_THEME : stylePresets[preset].LIGHT_THEME;
  const contentContainerStyles = flatten([styleTheme.CONTENT_CONTAINER]);
  const contentStyles = flatten([styleTheme.CONTENT]);
  const footerStyles = flatten([styleTheme.FOOTER]);
  const sheetContainerStyles = flatten([styleTheme.SHEET_CONTAINER]);
  const sheetContentStyles = flatten([styleTheme.SHEET_CONTENT]);
  const buttonContainerStyles = flatten([styleTheme.BUTTON_CONTAINER]);
  const fontButtonStyles = flatten([styleTheme.FONT_BUTTON]);
  const titleStyles = flatten([styleTheme.TITLE]);
  const iconStyles = flatten([styleTheme.ICON]);

  const settingsSheetRef = useRef(null);
  const chapterListSheetRef = useRef(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleShownSettings = () => settingsSheetRef.current?.expand();
  const toggleShowChapterList = () => chapterListSheetRef.current?.expand();

  const handleFontSizeChange = (value) => setFontSize(value);
  const handleFontFamilyChange = (family) => setFontFamily(family);
  const handleLineHeightChange = (value) => setLineHeight(value);

  const initChapterContent = async (source) => {
    //console.log(`Source ID in Chapter Content: ${source.id}`); 
    const chapterSource = SourceFactory.createSource(source.id);
    await chapterSource.findContentByChapter(chapter).then((chapter) => {
      setChapterContent(chapter.content);
    }).catch((error) => {
      console.error('Error finding chapters by page:', error);
    });
  };

  useEffect(() => {
    initChapterContent(source);
  }, [source]);

  useEffect(() => {
    setIsEmpty(!chapterContent);
  }, [chapterContent]);

  // const renderItem = (chapter: Chapter) => {
  //   return <ChapterListItem chapter={chapter} novel={novel} source={source}/>;
  // };

  // const renderChapterList = () => {
  //   return (
  //     <View>
  //       <Row style={titleContainerStyles}>
  //         <Column style={{ flex: 4, borderColor: color.ligthTheme.fourth, borderBottomWidth: 1 }}>
  //           <Text style={titleStyles}>{chapterList.length} {translate("novelDetailScreen.chapters")}</Text>
  //         </Column>
  //         <Column style={{ flex: 6 }} />
  //       </Row>
  //       <FlatList
  //         data={filteredData}
  //         renderItem={({ item }) => renderItem(item)}
  //         keyExtractor={(item) => item.id.toString()}
  //         showsVerticalScrollIndicator={true}
  //       />
  //     </View>

  //   );
  // };

  const LoadingCircle = () => {
    return (
      <View style={loadingContainerStyles}>
        <ActivityIndicator size="large" color={color.common.blue} />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView contentContainerStyle={contentContainerStyles}>
        <Text style={[contentStyles, { fontSize, fontFamily, lineHeight }]}>{chapter.content}</Text>
      </ScrollView>
    );
  };

  const renderFooter = () => {
    return (
      <Row style={footerStyles}>
        <TouchableOpacity onPress={toggleShownSettings}>
          <VectorIcon name="settings-outline" size={iconSize.medium} style={iconStyles} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleShowChapterList}>
          <VectorIcon name="list-outline" size={iconSize.medium} style={iconStyles} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDarkMode}>
          <VectorIcon name={darkMode ? "moon" : "sunny"} size={iconSize.medium} style={iconStyles} />
        </TouchableOpacity>
      </Row>
    );
  };

  const renderSettings = () => {
    return (
      <BottomSheet style={sheetContainerStyles} ref={settingsSheetRef} index={-1} snapPoints={['40%']} enablePanDownToClose={true}>
        <View style={sheetContentStyles}>
          <Text style={titleStyles}>Font Size</Text>
          <Slider value={fontSize} onValueChange={handleFontSizeChange} minimumValue={10} maximumValue={20} />
          <Text style={titleStyles}>Font Family</Text>
          <View style={buttonContainerStyles}>
            <TouchableOpacity onPress={() => handleFontFamilyChange('Roboto')} style={fontButtonStyles}>
              <Text>Roboto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFontFamilyChange('Arial')} style={fontButtonStyles}>
              <Text>Arial</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFontFamilyChange('Times New Roman')} style={fontButtonStyles}>
              <Text>Times New Roman</Text>
            </TouchableOpacity>
          </View>
          <Text style={titleStyles}>Line Spacing</Text>
          <View style={buttonContainerStyles}>
            <TouchableOpacity onPress={() => handleLineHeightChange(fontSize * 1.5)} style={fontButtonStyles}>
              <Text>  0.5  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLineHeightChange(fontSize * 2)} style={fontButtonStyles}>
              <Text>  1.0  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLineHeightChange(fontSize * 2.5)} style={fontButtonStyles}>
              <Text>  1.5  </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    );
  };

  const renderChapterList = () => {
    return (
      <BottomSheet style={sheetContainerStyles} ref={chapterListSheetRef} index={-1} snapPoints={['50%']} enablePanDownToClose={true}>
        <View style={sheetContentStyles}>
          <Text style={titleStyles}>Chapter List</Text>
        </View>
      </BottomSheet>
    );
  };

  return (
    <View style={[containerStyles]}>
      {renderContent()}
      {renderFooter()}
      {renderSettings()}
      {renderChapterList()}
    </View>
  );
});
