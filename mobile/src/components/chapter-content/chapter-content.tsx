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


export const ChapterContent = observer(function ChapterContent(props: ChapterContentProps) {
  const { preset = "default", style: styleOverride, source, novel, chapter, ...rest } = props;
  
  const containerStyles = flatten([
    stylePresets[preset].CONTAINER,
    styleOverride,
  ]);
 
  const contentContainerStyles = flatten([stylePresets[preset].Content_CONTAINER]);
  const titleContainerStyles = flatten([stylePresets[preset].TITLE_CONTAINER]);
  const titleStyles = flatten([stylePresets[preset].TITLE]);

  const loadingContainerStyles = flatten([
    stylePresets[preset].LOADING_CONTAINER,
  ]);
  const loadingStyles = flatten([stylePresets[preset].LOADING]);

  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const [chapterContent, setChapterContent] = useState<Chapter | null>(null);
  
  
  const [filteredData, setFilteredData] = useState(chapterContent);

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


  const renderChapterContent = () => {
    return (
      <View>
        
      </View>
      
    );
  };


  const renderBody = () => {
    return (
      <Column style={contentContainerStyles}>
        
        {isEmpty ? LoadingCircle() : renderChapterContent()}
      
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
    //<Column style={containerStyles}>
    <View>
      {/* {renderBody()}
      {loading && <LoadingCircle />} */}
    </View>
    //</Column>
  );
});
