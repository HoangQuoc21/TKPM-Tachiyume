import {observer} from 'mobx-react-lite';
import React, {FC, useEffect, useState} from 'react';
import styles from './about-screen.styles';
import { StackScreenProps } from "@react-navigation/stack"
import { View, Text, Linking } from 'react-native';
import { MainStackName } from "../../navigators/main-navigators"
import { NavigatorParamList } from "../../navigators/app-navigator"

// Import the custom components
import { Screen } from "../../components/screen/screen"
import { Column } from '../../components/column/column';
import { Row } from '../../components/row/row';
import { Logo } from '../../components/logo/logo';
import { VectorIcon } from '../../components/vector-icon/vector-icon';

import { translate } from '../../i18n'
import { iconSize } from '../../theme';



export const AboutScreen: FC<
    StackScreenProps<NavigatorParamList, typeof AboutScreenName>
> = observer(({ navigation, route }) => {

    const renderHeader = () => {
        return (
            <Column style={styles.HEADER}>
                <Logo
                    overridStyle={styles.LOGO}
                />
            </Column>
        )
    }

    const aboutProjectItems = [
        {
            iconName: "bookmarks",
            label: "Project Information",
            urlLink: "React",
        },
        {
            iconName: "logo-github",
            label: "GitHub repository",
            urlLink: "https://github.com/HoangQuoc21/TKPM-Tachiyume",
        },
    ]

    const aboutDeveloperItems = [
        {
            iconName: "people-circle",
            label: "Group's Information",
            urlLink: "LinkedIn",
        },
    ]

    const openUrl = (url: string) => {
        try{
            Linking.openURL(url)
        }
        catch(e){
            console.log('--> [AboutScreen] Open URL error: ',e)
        }
    }

    const renderSection = (title: string, content: any) => {
        return (
            <Column style={styles.SECTION_CONTAINER}>
                <Text style={styles.SECTION_TITLE}>{title}</Text>
                {
                    content.map((item, index) => {
                        const { iconName, urlLink, label } = item
                        return (
                            <Row key={index} style={styles.ITEM_CONATINER}>
                                <VectorIcon
                                    name={iconName}
                                    size={iconSize.medium}
                                />
                                <Text style={styles.ITEM_TEXT} onPress={() => openUrl(urlLink)}>
                                    {label}
                                </Text>
                            </Row>
                        )
                    })
                }
            </Column>
        )
    }



    const renderBody = () => {
        return (
            <Column style={styles.BODY}>
                {renderSection(translate("aboutScreen.aboutProject"), aboutProjectItems)}
                {renderSection(translate("aboutScreen.aboutDeveloperTeam"), aboutDeveloperItems)}
            </Column>
        )
    }


    return (
        <Screen style={styles.ROOT} preset="fixed" unsafe>
            {renderHeader()}
            {renderBody()}
        </Screen>
    )
})

export const AboutScreenName = "about"