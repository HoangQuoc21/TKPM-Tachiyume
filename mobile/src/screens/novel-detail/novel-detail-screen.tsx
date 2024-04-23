import {observer} from 'mobx-react-lite';
import React, {FC, useEffect, useState} from 'react';
import styles from './novel-detail-screen.styles';
import { StackScreenProps } from "@react-navigation/stack"
import { View, Text } from 'react-native';

export function NovelDetailScreen({navigation, route}){

    const renderHeader = () => {
        return (
            <View style={styles.HEADER}>
                <Text style={styles.TEXT}>
                    This is the header of the novelDetail screen
                </Text>
            </View>
        )
    }

    const renderBody = () => {
        return (
            <View style={styles.BODY}>
                <Text style={styles.TEXT}>
                    This is the body of the novelDetail screen
                </Text>
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View style={styles.FOOTER}>
                <Text style={styles.TEXT}>
                    This is the footer of the novelDetail screen
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

export const NovelDetailScreenName = "novelDetail"