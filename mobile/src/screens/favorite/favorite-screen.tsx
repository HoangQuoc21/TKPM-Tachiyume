import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import styles from './favorite-screen.styles';
import { StackScreenProps } from "@react-navigation/stack"
import { View, Text, Button } from 'react-native';
import { getLocales } from 'expo-localization';
import { MainStackName } from "../../navigators/main-navigators"
import { NavigatorParamList } from "../../navigators/app-navigator"

// Import the custom components
import { Screen } from "../../components/screen/screen"
import { Column } from '../../components/column/column';
import { translate } from '../../i18n'
import { ChapterScreenName } from '../chapter/chapter-screen';
import { FavoriteNovelList } from '../../components/favorite-novel-list/favorite-novel-list';

export const FavoriteScreen: FC<
    StackScreenProps<NavigatorParamList, typeof FavoriteScreenName>
> = observer(({ navigation, route }) => {

    const renderFavoriteNovelList = () => {
        return (
            <FavoriteNovelList />
        )
    }

    return (
        <Screen style={styles.ROOT} preset='fixed' unsafe>
            {renderFavoriteNovelList()}
        </Screen>
    )
})

export const FavoriteScreenName = "favorite"