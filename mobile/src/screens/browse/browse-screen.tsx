import {observer} from 'mobx-react-lite';
import React, {FC, useEffect, useState} from 'react';
import styles from './browse-screen.styles';
import { Header, StackScreenProps } from "@react-navigation/stack"
import { View, Text, Button } from 'react-native';

import { NovelListScreenName } from '../novel-list/novel-list-screen';
import { NovelDetailScreenName } from '../novel-detail/novel-detail-screen';
import { ChapterScreenName } from '../chapter/chapter-screen';

export function BrowseScreen({navigation, route}){

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
                <Text style={styles.TEXT}>
                    This is content from header of the screen hehe
                </Text>
                <Button
                    title="Go to Novel List"
                    onPress={onPressNovelList}
                />
            </View>
        )
    }

    const renderBody = () => {
        return (
            <View style={styles.BODY}>
                <Text style={styles.TEXT}>
                    This is content from body of the screen
                </Text>
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View style={styles.FOOTER}>
                <Text style={styles.TEXT}>
                    This is content from body of the screen
                </Text>
            </View>
        )
    }
    return (
        <View style={styles.ROOT}>
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
        </View>
    )
}

export const BrowseScreenName = "browse"