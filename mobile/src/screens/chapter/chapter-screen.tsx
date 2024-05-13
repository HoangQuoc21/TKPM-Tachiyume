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
import i18n from '../../i18n'

export const ChapterScreen: FC<
    StackScreenProps<NavigatorParamList, typeof ChapterScreenName>
> = observer(({ navigation, route }) => {

    const renderHeader = () => {
        return (
            <View style={styles.HEADER}>
                <Text style={styles.TEXT}>
                    This is the header of the chapter screen
                </Text>
            </View>
        )
    }

    const renderBody = () => {
        return (
            <View style={styles.BODY}>
                <Text style={styles.TEXT}>
                    This is the body of the chapter screen
                </Text>
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View style={styles.FOOTER}>
                <Text style={styles.TEXT}>
                    This is the footer of the chapter screen
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

export const ChapterScreenName = "chapter"