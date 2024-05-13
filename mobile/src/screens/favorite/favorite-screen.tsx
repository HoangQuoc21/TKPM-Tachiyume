import {observer} from 'mobx-react-lite';
import React, {FC, useEffect, useState} from 'react';
import styles from './favorite-screen.styles';
import { StackScreenProps } from "@react-navigation/stack"
import { View, Text } from 'react-native';
import { getLocales } from 'expo-localization';
import { MainStackName } from "../../navigators/main-navigators"
import { NavigatorParamList } from "../../navigators/app-navigator"

// Import the custom components
import { Screen } from "../../components/screen/screen"
import { Column } from '../../components/column/column';
import i18n from '../../i18n'

export const FavoriteScreen: FC<
    StackScreenProps<NavigatorParamList, typeof FavoriteScreenName>
> = observer(({ navigation, route }) => {

    const deviceLanguage = getLocales()[0].languageCode;

    const renderHeader = () => {
        return (
            <View style={styles.HEADER}>
                <Text style={styles.TEXT}>
                    This is the header of the favorite screen
                </Text>
            </View>
        )
    }

    const renderBody = () => {
        return (
            <View style={styles.BODY}>
                <Text style={styles.TEXT}>
                    {i18n.t('languages.en')}
                </Text>
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View style={styles.FOOTER}>
                <Text style={styles.TEXT}>
                    {`Device language: ${deviceLanguage}`}
                </Text>
            </View>
        )
    }

    return (
        <Screen style={styles.ROOT} preset='fixed' unsafe>
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
        </Screen>
    )
})

export const FavoriteScreenName = "favorite"