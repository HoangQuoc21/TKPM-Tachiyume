import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import styles from './splash-screen.styles';
import { StackScreenProps } from "@react-navigation/stack"
import { View, Text } from 'react-native';
import { MainStackName } from "../../navigators/main-navigators"
import { NavigatorParamList } from "../../navigators/app-navigator"

// Import the custom components
import { Logo } from '../../components/logo/logo';
import { Screen } from "../../components/screen/screen"
import { Column } from '../../components/column/column';
import { translate } from '../../i18n'

// import the app name from app.json
import {expo} from '../../../app.json'
import { timing } from '../../theme/timing';
const appName = expo.name
const appVersion = expo.version

export const SplashScreen: FC<
    StackScreenProps<NavigatorParamList, typeof SplashScreenName>
> = observer(({ navigation, route }) => {

    const init = () => {
        setTimeout(() => {
            nextScreen()
        }, timing.normal)
    }

    const nextScreen = () => {
        navigation.navigate(MainStackName)
    }

    useEffect(() => {
        init()
    }, [])

    const renderHeader = () => {
        return (
            <Column style={styles.HEADER}/>
        )
    }

    const renderLogo = () => {
        return (
            <Logo />
        )
    }

    const renderTitle = () => {
        return (
            <Text style={styles.TITLE}>
                {appName}
            </Text>
        )
        
    }

    const renderBody = () => {
        return (
            <Column style={styles.BODY}>
                {renderLogo()}
                {renderTitle()}
            </Column>
        )
    }

    const renderAppVersion = () => {
        return (
            <Text style={styles.TEXT}>
                {translate('splashScreen.version')} {appVersion}
            </Text>
        )
    }

    const renderDeveloper = () => {
        return (
            <Text style={styles.TEXT}>
                {translate('splashScreen.developedBy')}
            </Text>
        )
    }

    const renderFooter = () => {
        return (
            <Column style={styles.FOOTER}>
                {renderAppVersion()}
                {renderDeveloper()}
            </Column>
        )
    }

    return (
        <Screen style={styles.ROOT} preset="fixed" unsafe>
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
        </Screen>
    )
})

export const SplashScreenName = "splash"