import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import styles from './history-screen.styles';
import { StackScreenProps } from "@react-navigation/stack"
import { View, Text } from 'react-native';
import { MainStackName } from "../../navigators/main-navigators"
import { NavigatorParamList } from "../../navigators/app-navigator"

// Import the custom components
import { Screen } from "../../components/screen/screen"
import { Column } from '../../components/column/column';
import { HistoryChapterList } from '../../components/history-chapter-list/history-chapter-list';
import { translate } from '../../i18n'

export const HistoryScreen: FC<
    StackScreenProps<NavigatorParamList, typeof HistoryScreenName>
> = observer(({ navigation, route }) => {
    const renderHistoryChapterList = () => {
        return (
            <HistoryChapterList />
        )
    }

    return (
        <Screen style={styles.ROOT} preset='fixed' unsafe>
            {renderHistoryChapterList()}
        </Screen>
    )
})

export const HistoryScreenName = "history"