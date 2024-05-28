import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import styles from './browse-screen.styles';
import { Header, StackScreenProps } from "@react-navigation/stack"
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { NovelListScreenName } from '../novel-list/novel-list-screen';
import { NovelDetailScreenName } from '../novel-detail/novel-detail-screen';
import { ChapterScreenName } from '../chapter/chapter-screen';
import { MainStackName } from "../../navigators/main-navigators"
import { NavigatorParamList } from "../../navigators/app-navigator"

// Import the i18n for translation
import { translate } from '../../i18n'

// Import the custom components
import { Screen } from "../../components/screen/screen"
import { Column } from '../../components/column/column';

import { SourceList } from '../../components/source-list/source-list';
import { FloatingButton } from '../../components/floating-button/floating-button';
import { ImportSourceModal } from '../../components/import-source-modal/import-source-modal';


export const BrowseScreen: FC<
    StackScreenProps<NavigatorParamList, typeof BrowseScreenName>
> = observer(({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);

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
            {renderModal()}
            {renderSourceList()}
            {renderFloatingButton()}
        </Screen>
    )
})

export const BrowseScreenName = "browse"