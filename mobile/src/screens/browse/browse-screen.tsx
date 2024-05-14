import {observer} from 'mobx-react-lite';
import React, {FC, useEffect, useState} from 'react';
import styles from './browse-screen.styles';
import { Header, StackScreenProps } from "@react-navigation/stack"
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';

import { NovelListScreenName } from '../novel-list/novel-list-screen';
import { NovelDetailScreenName } from '../novel-detail/novel-detail-screen';
import { ChapterScreenName } from '../chapter/chapter-screen';
import SourceOne from '../../../factory/SourceOne';
import { MainStackName } from "../../navigators/main-navigators"
import { NavigatorParamList } from "../../navigators/app-navigator"

// Import the custom components
import { Screen } from "../../components/screen/screen"
import { Column } from '../../components/column/column';
import i18n from '../../i18n'

export const BrowseScreen: FC<
    StackScreenProps<NavigatorParamList, typeof BrowseScreenName>
> = observer(({ navigation, route }) => {
    const sourceOne = new SourceOne();

    const [novelList, setNovelList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNovelList = async () => {
        setLoading(true);
        const novelList = await sourceOne.findNovelsByPage(2);
        console.log('--> novel list: ', novelList)
        return novelList;
    }
    
    useEffect(() => {
        fetchNovelList().then((novelList) => {
            setNovelList(novelList);
            setLoading(false);
        }) 
    },[])

    const onPressNovelList = () => {
        navigation.navigate(NovelListScreenName,{
            header:'Novel List Screen Name',
            data:{

            }
        })
    }

    const renderHeader = () => {
        return (
            <View style={styles.HEADER}>
                <Text style={[styles.TEXT, {alignSelf:'center', fontWeight:'bold'}]}>
                    Novel List
                </Text>
            </View>
        )
    }

    const renderBody = () => {
        return (
            <View style={styles.BODY}>
                <FlatList
                    data={novelList}
                    renderItem={({item}) => (
                        <View style={styles.CONTAINER}>
                            <Text style={styles.TITLE}>{item.name}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.url}
                />
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View style={styles.FOOTER}>
            </View>
        )
    }

    const LoadingCircle = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    };

    return (
        <Screen style={styles.ROOT} preset='fixed' unsafe>
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
            {loading && LoadingCircle()}
        </Screen>
    )
})

export const BrowseScreenName = "browse"