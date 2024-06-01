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
import Slider from '@react-native-community/slider';

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
import { ScrollView } from "react-native-gesture-handler";
import CustomSlider from "../slider/slider";


export const ChapterContent = observer(function ChapterContent(props: ChapterContentProps) {
  const { preset = "default", style: styleOverride, source, novel, chapter, ...rest } = props;
  
  const containerStyles = flatten([
    stylePresets[preset].CONTAINER,
    styleOverride,
  ]);
 
  const contentContainerStyles = flatten([stylePresets[preset].CONTENT_CONTAINER]);
  
  const loadingContainerStyles = flatten([
    stylePresets[preset].LOADING_CONTAINER,
  ]);
  const loadingStyles = flatten([stylePresets[preset].LOADING]);
  const darkModeStyles = flatten([stylePresets[preset].DARK_MODE]);
  const lightModeStyles = flatten([stylePresets[preset].LIGHT_MODE]);
  const contentStyles = flatten([stylePresets[preset].CONTENT]);
  const footerStyles = flatten([stylePresets[preset].FOOTER]);
  const sheetContainerStyles = flatten([stylePresets[preset].SHEET_CONTAINER]);
  const sheetContentStyles = flatten([stylePresets[preset].SHEET_CONTENT]);
  const buttonContainerStyles = flatten([stylePresets[preset].BUTTON_CONTAINER]);
  const fontButtonStyles = flatten([stylePresets[preset].FONT_BUTTON]);
  const titleStyles = flatten([stylePresets[preset].TITLE]);


  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const [chapterContent, setChapterContent] = useState<Chapter | null>(null);
  const [fontSize, setFontSize] = useState(15);
  const [fontFamily, setFontFamily] = useState('Roboto');
  const [lineHeight, setLineHeight] = useState(30);
  const [darkMode, setDarkMode] = useState(false);
  const [showChapterList, setShowChapterList] = useState(false);

  const settingsSheetRef = useRef(null);
  const chapterListSheetRef = useRef(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleShowChapterList = () => chapterListSheetRef.current?.expand();

  const handleFontSizeChange = (value) => setFontSize(value);
  const handleFontFamilyChange = (family) => setFontFamily(family);
  const handleLineHeightChange = (value) => setLineHeight(value);

  const themeStyles = darkMode ? darkModeStyles : lightModeStyles;

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

  const initChapterContent = async (source) => {
    console.log(`Source ID in Chapter Content: ${source.id}`); 
    
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
      <View style={footerStyles}>
        <TouchableOpacity onPress={() => settingsSheetRef.current?.expand()}>
          <VectorIcon name="settings-outline" size={iconSize.medium} color={color.ligthTheme.accent} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleShowChapterList}>
          <VectorIcon name="list-outline" size={iconSize.medium} color={color.ligthTheme.accent} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDarkMode}>
          <VectorIcon name={darkMode ? "moon" : "sunny"} size={iconSize.medium} color={color.ligthTheme.accent} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSettings = () => {
    return (
      <BottomSheet style={sheetContainerStyles} ref={settingsSheetRef} index={-1} snapPoints={['40%']} enablePanDownToClose={true}>
        <View style={sheetContentStyles}>
          <Text style={titleStyles}>Font Size</Text>
          {/* <Slider
            minimumValue={10}
            maximumValue={20}
            value={fontSize}
            onValueChange={handleFontSizeChange}
          /> */}
          <CustomSlider
            minimumValue={10}
            maximumValue={20}
            value={fontSize}
            onValueChange={handleFontSizeChange}
          />
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
            <TouchableOpacity onPress={() => handleLineHeightChange(fontSize*1.5)} style={fontButtonStyles}>
              <Text>  0.5  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLineHeightChange(fontSize*2)} style={fontButtonStyles}>
              <Text>  1.0  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLineHeightChange(fontSize*2.5)} style={fontButtonStyles}>
              <Text>  1.5  </Text>
            </TouchableOpacity>
          </View>
          {/* <Slider
            minimumValue={0.5}
            maximumValue={1.5}
            value={letterSpacing}
            onValueChange={handleLetterSpacingChange}
          /> */}
        </View>
      </BottomSheet>
    );
  };

  const renderChapterList = () => {
    return (
      <BottomSheet style={sheetContainerStyles} ref={chapterListSheetRef} index={-1} snapPoints={['50%']} enablePanDownToClose={true}>
        <View style={sheetContentStyles}>
          <Text style={titleStyles}>Chapter List</Text>
          {/* Render the list of chapters here */}
        </View>
      </BottomSheet>
    );
  };

  return (
    <View style={[containerStyles, themeStyles]}>
      {renderContent()}
      {renderFooter()}
      {renderSettings()}
      {renderChapterList()}
    </View>
  );
});
