import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import styles from './browse-screen.styles';
import { Header, StackScreenProps } from "@react-navigation/stack"
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { NovelListScreenName } from '../novel-list/novel-list-screen';
import { NovelDetailScreenName } from '../novel-detail/novel-detail-screen';
import { ChapterScreenName } from '../chapter/chapter-screen';
import SourceOne from '../../factory/SourceOne';
import { MainStackName } from "../../navigators/main-navigators"
import { NavigatorParamList } from "../../navigators/app-navigator"

// Import the custom components
import { Screen } from "../../components/screen/screen"
import { Column } from '../../components/column/column';

import { SourceList } from '../../components/source-list/source-list';
import { FloatingButton } from '../../components/floating-button/floating-button';
import { ImportSourceModal } from '../../components/import-source-modal/import-source-modal';

// Import the models
import Source from '../../models/sources/source';

import {SourceOne}  from '../../models/sources/source-one';
import {SourceTwo} from '../../models/sources/source-two';



export const BrowseScreen: FC<
    StackScreenProps<NavigatorParamList, typeof BrowseScreenName>
> = observer(({ navigation, route }) => {
    const sourceOne = new SourceOne();
    const sourceTwo = new SourceTwo();

    const [novelList, setNovelList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [source, setSource] = useState<Source>();


    const [novelDetail, setNovelDetail] = useState();
    const [chapterList, setChapterList] = useState([]);
    const [chapterContent, setChapterContent] = useState();

    const [modalVisible, setModalVisible] = useState(false);


    const fetchNovelList = async () => {
        setLoading(true);
        // const novelList = await sourceOne.findNovelsByPage(1);

        // console.log('--> novel list: ', novelList[0])
        const novelDetail = await sourceOne.findNovelDetails(novel);
        console.log(novelDetail)

        return novelList;
    }

    // useEffect(() => {
    //     fetchNovelList().then((novelList) => {
    //         setNovelList(novelList);
    //         setLoading(false);
    //     }) 
    //     setSource(sourceOne);

    // },[])

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

                source: sourceOne
            }
        })
    }

    const renderHeader = () => {
        return (
            <View style={styles.HEADER}>
                <Text style={[styles.TEXT, { alignSelf: 'center', fontWeight: 'bold' }]}>
                    Novel List
                    Source One information
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
                <Text style={[styles.TEXT, { alignSelf: 'center', fontWeight: 'bold' }]}>
                    Novel List
                </Text>
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



    const onFloatingButtonPress = () => {
        setModalVisible(!modalVisible)
    }

    const renderModal = () => {
        return (
            <ImportSourceModal
                isVisible={modalVisible}
                onClosePress={onFloatingButtonPress}
            />
        )
    }

    const renderSourceList = () => {
        return (
            <SourceList />
        )
    }

    const renderFloatingButton = () => {
        return (
            <FloatingButton
                icon='add-sharp'
                onPress={onFloatingButtonPress}
            />
        )
    }

    return (
        <Screen style={styles.ROOT} preset='fixed' unsafe>
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
            {loading && LoadingCircle()}
            {loading && LoadingCircle()} */}
            {renderModal()}
            {renderSourceList()}
            {renderFloatingButton()}
        </Screen>
    )
})

export const BrowseScreenName = "browse"