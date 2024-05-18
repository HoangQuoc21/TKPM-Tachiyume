import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import styles from './browse-screen.styles';
import { Header, StackScreenProps } from "@react-navigation/stack"
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';

import { NovelListScreenName } from '../novel-list/novel-list-screen';
import { NovelDetailScreenName } from '../novel-detail/novel-detail-screen';
import { ChapterScreenName } from '../chapter/chapter-screen';
import SourceOne from '../../factory/SourceOne';
import { MainStackName } from "../../navigators/main-navigators"
import { NavigatorParamList } from "../../navigators/app-navigator"

// Import the custom components
import { Screen } from "../../components/screen/screen"
import { Column } from '../../components/column/column';
import { translate } from '../../i18n'
const novel = {"cover": "https://allnovel.org/uploads/thumbs/hidden-marriage-f01a027382-cc9bf2a443c2b4f991d7b0910611187a.jpg"
, "name": "Hidden Marriage"
, "sourceId": 1
, "url": "/hidden-marriage.html"}

// Import the models
import { Source } from '../../models/source';

export const BrowseScreen: FC<
    StackScreenProps<NavigatorParamList, typeof BrowseScreenName>
> = observer(({ navigation, route }) => {
    const sourceOne = new SourceOne();

    const [novelList, setNovelList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [source, setSource] = useState<Source>();


    const fetchNovelList = async () => {
        setLoading(true);
        // const novelList = await sourceOne.findNovelsByPage(1);
        // console.log('--> novel list: ', novelList[0])
        const novelDetail = await sourceOne.findNovelDetails(novel);
        console.log(novelDetail)
        return novelList;
    }

    useEffect(() => {
        fetchNovelList().then((novelList) => {
            setNovelList(novelList);
            setLoading(false);
        })
        setSource(sourceOne as unknown as Source);
    }, [])

    const onPressNovelList = () => {
        navigation.navigate(NovelListScreenName, {
            header: 'Novel List Screen Name',
            data: {

            }
        })
    }

    const renderHeader = () => {
        return (
            <View style={styles.HEADER}>
                <Text style={[styles.TEXT, { alignSelf: 'center', fontWeight: 'bold' }]}>
                    Novel List
                </Text>
                <Text style={[styles.TEXT]}>
                    {`Source one's sourceId: ${source?.id}`}
                </Text>
                <Text style={[styles.TEXT]}>
                    {`Source one's baseURL: ${source?.baseUrl}`}
                </Text>
                <Text style={[styles.TEXT]}>
                    {`Source one's sourceTitle: ${source?.sourceTitle}`}
                </Text>
                <Text style={[styles.TEXT]}>
                    {`Source one's thumbnail: ${source?.thumbnail}`}
                </Text>
                <Text style={[styles.TEXT]}>
                    {`Source one's readLanguage: ${source?.readLanguage}`}
                </Text>
            </View>
        )
    }

    const renderBody = () => {
        return (
            <View style={[styles.BODY, { marginTop: 20 }]}>
                <FlatList
                    data={novelList}
                    renderItem={({ item }) => (
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