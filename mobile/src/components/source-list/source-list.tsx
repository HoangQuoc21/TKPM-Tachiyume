import * as React from 'react';
import { useEffect, useState, useContext, useRef } from 'react';
import { useToast } from "react-native-toast-notifications";
import { observer } from 'mobx-react-lite';
import { flatten } from 'ramda';
import { SourceListProps } from './source-list.props';
import { stylePresets } from './source-list.presets';
import {
    FlatList,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    BackHandler
} from 'react-native';

import { Column } from "../column/column";
import { Row } from "../row/row";
import { SourceListItem } from "../source-list-item/source-list-item";
import { translate } from "../../i18n";

// Import the models
import Source from '../../models/sources/source';
import { color, iconSize } from "../../theme";
import { VectorIcon } from "../vector-icon/vector-icon";

// Import the context
import { NovelSourceListContext } from '../../providers/novel-source-list-provider';


export const SourceList = observer(function SourceList(props: SourceListProps) {
  const { preset = "default", style: styleOverride, ...rest } = props;

    const containerStyles = flatten([stylePresets[preset].CONTAINER, styleOverride])
    const searchBarContainerStyles = flatten([stylePresets[preset].SEARCH_BAR_CONTAINER])
    const searchBarStyles = flatten([stylePresets[preset].SEARCH_BAR])
    const listContainerStyles = flatten([stylePresets[preset].LIST_CONTAINER])
    const titleContainerStyles = flatten([stylePresets[preset].TITLECONTAINER])
    const titleStyles = flatten([stylePresets[preset].TITLE])
    const emptyContainerStyles = flatten([stylePresets[preset].EMPTY_CONTAINER])
    const emptyTextStyles = flatten([stylePresets[preset].EMPTY_TEXT])
    const loadingContainerStyles = flatten([stylePresets[preset].LOADING_CONTAINER])
    const loadingStyles = flatten([stylePresets[preset].LOADING])
    const clearButtonStyles = flatten([stylePresets[preset].CLEAR_BUTTON])
    const clearButtonTextStyles = flatten([stylePresets[preset].CLEAR_BUTTON_TEXT])

    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(false)


    //Go to the NovelSourceListProvider to know all the methods available
    const [sourceList, addSourceToStorage, removeSourceFromStorage, clearSourcesFromStorage] = useContext(NovelSourceListContext);

    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(sourceList);

    const toast = useToast();

    // Add this ref to clear focus on text input when press back button
    const textInputRef = useRef(null);
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (textInputRef.current && textInputRef.current.isFocused()) {
                textInputRef.current.blur();
                return true; // prevent default behavior (exit app)
            }
            return false; // allow default behavior
        });
        return () => backHandler.remove();
    }, []);



    useEffect(() => {
        if (sourceList.length == 0) {
            setIsEmpty(true)
        }
        else {
            setFilteredData(sourceList)
            setIsEmpty(false)
        }
        setLoading(false)
    }, [sourceList])

    const handleSearch = (text: string) => {
        setSearch(text);
        setIsSearch(true);
        if (text) {
            const filterSourceList = sourceList.filter((item: Source) => {
                const itemData = item.sourceTitle.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(filterSourceList);
        } else {
            setIsSearch(false);
            setFilteredData(sourceList);
        }
    };

    const clearSearch = () => {
        setSearch("");
        setFilteredData(sourceList);
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
                    {isSearch ?
                        (<TouchableOpacity onPress={clearSearch}>
                            <VectorIcon
                                name={"close-outline"}
                                color={color.lightTheme.accent}
                                size={iconSize.medium}
                            />
                        </TouchableOpacity>) :
                        (<VectorIcon
                            name={"search-outline"}
                            color={color.lightTheme.accent}
                            size={iconSize.medium}
                        />)}
                </Column>
            </Row>
        );
    };

    const renderEmpty = () => {
        return (
            <Column style={emptyContainerStyles}>
                <Text style={emptyTextStyles}>
                    {translate("sourceList.empty")}
                </Text>
            </Column>
        )
    }

    const onClearSourcesPress = () => {
        if(sourceList.length == 0) {
            toast.show(translate("error.noSource"), { type: 'warning' })
            return;
        }
        clearSourcesFromStorage();
        toast.show(translate("success.clearSource"), { type: 'success' })
    }

    const renderTitle = () => {
        return (
            <Row style={titleContainerStyles}>
                <Column style={{ flex: 4, borderColor: color.lightTheme.fourth, borderBottomWidth: 1 }}>
                    <Text style={titleStyles}>{translate("sourceList.title")}</Text>
                </Column>
                <Column style={{ flex: 6 }} />
                <TouchableOpacity
                    onPress={onClearSourcesPress}
                    style={clearButtonStyles}
                >
                    <Text style={clearButtonTextStyles}>
                        {translate("sourceList.clear")}
                    </Text>
                </TouchableOpacity>
            </Row>

        )
    }

    const renderItem = (item: Source) => {
        return (
            <SourceListItem item={item} />
        )
    }

    const renderSourceList = () => {
        return (
            <FlatList
                data={filteredData}
                renderItem={({ item }) => (renderItem(item))}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={true}
            />
        )
    }

    const renderBody = () => {
        return (
            <Column style={listContainerStyles}>
                {renderTitle()}
                {isEmpty ? renderEmpty() : renderSourceList()}
            </Column>
        )
    }

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
