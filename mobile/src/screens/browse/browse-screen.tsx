import {observer} from 'mobx-react-lite';
import React, {FC, useEffect, useState} from 'react';
import styles from './browse-screen.styles';
import { Header, StackScreenProps } from "@react-navigation/stack"
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';

import { NovelListScreenName } from '../novel-list/novel-list-screen';
import { NovelDetailScreenName } from '../novel-detail/novel-detail-screen';
import { ChapterScreenName } from '../chapter/chapter-screen';
import SourceOne from '../../../factory/SourceOne';

export function BrowseScreen({navigation, route}){
    const sourceOne = new SourceOne();

    const [novelList, setNovelList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNovelList = async () => {
        setLoading(true);
        const novelList = await sourceOne.findNovelsByPage(2);
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
                            <Text style={styles.SUBTITLE}>{item.summary}</Text>
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
        <View style={styles.ROOT}>
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
            {loading && LoadingCircle()}
        </View>
    )
}

export const BrowseScreenName = "browse"