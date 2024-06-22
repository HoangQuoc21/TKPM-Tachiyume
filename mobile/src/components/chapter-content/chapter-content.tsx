import * as React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { useToast } from "react-native-toast-notifications";
import { observer } from "mobx-react-lite";
import { flatten } from "ramda";
import { ChapterContentProps } from "./chapter-content.props";
import { stylePresets } from "./chapter-content.presets";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from "react-native";

import { useFonts } from 'expo-font';


//import React, { useState, useRef } from 'react';
//import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { FlatList } from "react-native-gesture-handler";

import { Column } from "../column/column";
import { Row } from "../row/row";
import { ChapterListItem } from "../chapter-list-item/chapter-list-item";
import { translate } from "../../i18n";

// Import the models
import Chapter from "../../models/chapter";
import Source from "../../models/sources/source";
import { color, iconSize, spacing, typography } from "../../theme";
import { VectorIcon } from "../vector-icon/vector-icon";
import { getSources }  from "../../storages/novel-sources-storage"
import { SourcePlugin } from '../../factories/source-plugin';
import { ScrollView } from "react-native-gesture-handler";
import { Slider } from "../slider/slider";


export const ChapterContent = observer(function ChapterContent(props: ChapterContentProps) {
  const { preset = "default", style: styleOverride, source, novel, chapter, ...rest } = props;

  const [fontsLoaded] = useFonts({
    'Arial': require('../../../assets/fonts/Arial.ttf'),
    'Times-New-Roman': require('../../../assets/fonts/Times-New-Roman.ttf'),
  })
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chapterContent, setChapterContent] = useState<Chapter | null>(null);
  const [fontSize, setFontSize] = useState(15);
  const [fontFamily, setFontFamily] = useState('Roboto');
  const [lineHeight, setLineHeight] = useState(30);
  const [darkMode, setDarkMode] = useState(false);
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const [showChapterList, setShowChapterList] = useState(false);
  const [sourceHandle, setSourceHandle] = useState(source); 
  const [sources, setSources] = useState<Source[]>([]); 

  const containerStyles = flatten([stylePresets[preset].CONTAINER, styleOverride,]);
  const loadingContainerStyles = flatten([stylePresets[preset].LOADING_CONTAINER,]);
  const loadingStyles = flatten([stylePresets[preset].LOADING]);
  const sheetContentStyles = flatten([stylePresets[preset].SHEET_CONTENT]);

  const styleTheme = darkMode ? stylePresets[preset].DARK_THEME : stylePresets[preset].LIGHT_THEME;
  const contentContainerStyles = flatten([styleTheme.CONTENT_CONTAINER]);
  const contentStyles = flatten([styleTheme.CONTENT]);
  const footerStyles = flatten([styleTheme.FOOTER]);
  const sheetContainerStyles = flatten([styleTheme.SHEET_CONTAINER]);
  const buttonContainerStyles = flatten([styleTheme.BUTTON_CONTAINER]);
  const fontButtonStyles = flatten([styleTheme.FONT_BUTTON]);
  const titleStyles = flatten([styleTheme.TITLE]);
  const iconStyles = flatten([styleTheme.ICON]);

  const settingsSheetRef = useRef(null);
  const chapterListSheetRef = useRef(null);
  const sourceListSheetRef = useRef(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleShownSettings = () => settingsSheetRef.current?.expand();
  const toggleShowChapterList = () => chapterListSheetRef.current?.expand();
  const toggleShowSourceList = () => sourceListSheetRef.current?.expand();

  const handleFontSizeChange = (value) => setFontSize(value);
  const handleFontFamilyChange = (family) => setFontFamily(family);
  const handleLineHeightChange = (value) => setLineHeight(value);

  const initSourceList = async () => {
    const sourceList = await getSources()
    setSources(sourceList)
  }

  const initChapterContent = async (source) => {
    //console.log(`Source ID in Chapter Content: ${source.id}`); 
    const chapterSource = await SourcePlugin.createSource(source.id);
    await chapterSource.findContentByChapter(chapter).then((chapter) => {
      setChapterContent(chapter.content);
    }).catch((error) => {
      console.error('Error finding chapters by page:', error);
    });
  };

  const initChapterList = async (source) => {
    const chapterSource = await SourcePlugin.createSource(source.id);
    console.log(chapterSource)
    await chapterSource.findChaptersByNovel(novel).then((chapters) => {
      const fetchChapterList = [];
      chapters.slice().reverse().forEach((chapter, index) => {
        fetchChapterList.push({
          ...chapter,
          id: chapters.length - index
        });
      });
      setChapterList(fetchChapterList);
    }).catch((error) => {
      console.error('Error finding chapters by page:', error);
    });
  };

  useEffect(() => {
    initSourceList()
    initChapterContent(source);
    initChapterList(source);
  }, [source, chapter]);



  useEffect(() => {
    setIsEmpty(!chapterContent);
  }, [chapterContent]);

  const renderChapterList = () => {
    return (
      <Column style={{alignItems: 'center', gap: spacing[2], padding: spacing[4]}}>
        <Text style={{
          ...typography.labelLarge,
          fontWeight: 'bold',
        }}>
          {"Chapter List"}
        </Text>
        <FlatList
          data={chapterList}
          renderItem={({ item }) => <ChapterListItem chapter={item} novel={novel} source={source} preset={"simple"} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={true}
        />
      </Column>
    );
  }

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
        <TouchableOpacity onPress={toggleShowSourceList}>
          <VectorIcon name="book" size={iconSize.medium} style={iconStyles}/>
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
            <TouchableOpacity onPress={() => handleFontFamilyChange('Times-New-Roman')} style={fontButtonStyles}>
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

  const handleSourceChange = async (newSource) => {
    const changeSource = await SourcePlugin.changeSource(newSource.id)
    const content = await changeSource.findChapterOfNovel(novel.title, chapter.title)
    setChapterContent(content);
    console.log(content)
    // setSource(newSource);
    // await initChapterContent(newSource);
    // await initChapterList(newSource);
  };

  const renderSourceList = () => {
    return (
      <BottomSheet style={sheetContainerStyles} ref={sourceListSheetRef} index={-1} snapPoints={['50%']} enablePanDownToClose={true}>
        <Column style={{ alignItems: 'center', gap: spacing[2], padding: spacing[4] }}>
          <Text style={{
            ...typography.labelLarge,
            fontWeight: 'bold',
          }}>
            {"Choose Source"}
          </Text>
          <FlatList
            data={sources}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSourceChange(item)} style={{ padding: spacing[2] }}>
                <Text>{item.sourceTitle}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={true}
          />
        </Column>
      </BottomSheet>
    );
  };
  const renderChapterListShortcut = () => {
    return (
      <BottomSheet style={sheetContainerStyles} ref={chapterListSheetRef} index={-1} snapPoints={['50%']} enablePanDownToClose={true}>
        {renderChapterList()}
      </BottomSheet>
    );
  };

  return (
    <View style={[containerStyles]}>
      {renderContent()}
      {renderFooter()}
      {renderSettings()}
      {renderChapterListShortcut()}
      {renderSourceList()}
    </View>
  );
});
