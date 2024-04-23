import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { AboutScreen, AboutScreenName } from "../screens/about/about-screen"
import { BrowseScreen, BrowseScreenName } from "../screens/browse/browse-screen"
import { FavoriteScreen, FavoriteScreenName } from "../screens/favorite/favorite-screen"
import { HistoryScreen, HistoryScreenName } from "../screens/history/history-screen"
import { NavigatorParamList } from './app-navigator'
import { color } from "../theme"


const Tab = createBottomTabNavigator<NavigatorParamList>()

export const MainStackName = "mainStack"

export function MainStack() {
    return (
        <Tab.Navigator
            initialRouteName={BrowseScreenName}
            screenOptions={{
                tabBarActiveTintColor: color.common.blue,
                tabBarInactiveTintColor: color.common.gray,
            }}
        >
            <Tab.Screen
                name={FavoriteScreenName}
                component={FavoriteScreen}
            />
            <Tab.Screen
                name={BrowseScreenName}
                component={BrowseScreen}
            />
            <Tab.Screen
                name={HistoryScreenName}
                component={HistoryScreen}
            />
            <Tab.Screen
                name={AboutScreenName}
                component={AboutScreen}
            />
        </Tab.Navigator>
    );
}