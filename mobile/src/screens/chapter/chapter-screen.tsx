import {observer} from 'mobx-react-lite';
import React, {FC, useEffect, useState} from 'react';
import styles from './chapter-screen.styles';
import { StackScreenProps } from "@react-navigation/stack"
import { View, Text } from 'react-native';
import { MainStackName } from "../../navigators/main-navigators"
import { NavigatorParamList } from "../../navigators/app-navigator"

// Import the custom components
import { Screen } from "../../components/screen/screen"
import { Column } from '../../components/column/column';
import {translate} from '../../i18n'
import { ChapterContent } from '../../components/chapter-content/chapter-content';

export const ChapterScreen: FC<
    StackScreenProps<NavigatorParamList, typeof ChapterScreenName>
> = observer(({ navigation, route }) => {

    const { title, subTitle, data } = route.params;
    const source = data.source;
    const chapter = data.chapter;
    const novel = data.novel;

    const renderChapterContent = () => {
        return <ChapterContent source={source} novel={novel} chapter={chapter}/>;
      };
   

    return (
        <Screen style={styles.ROOT} preset='fixed' unsafe>
            {renderChapterContent()}
            
        </Screen>
    )
})

export const ChapterScreenName = "chapter"