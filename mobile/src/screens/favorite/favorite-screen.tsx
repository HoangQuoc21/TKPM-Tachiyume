import {observer} from 'mobx-react-lite';
import React, {FC, useEffect, useState} from 'react';
import styles from './favorite-screen.styles';
import { StackScreenProps } from "@react-navigation/stack"
import { View, Text } from 'react-native';
import { getLocales } from 'expo-localization';
import i18n from '../../i18n'



export function FavoriteScreen({navigation, route}){

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
        <View style={styles.ROOT}>
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
        </View>
    )
}

export const FavoriteScreenName = "favorite"