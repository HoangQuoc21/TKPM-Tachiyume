import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"

import { AboutScreen, AboutScreenName } from "../screens/about/about-screen";
import { BrowseScreen, BrowseScreenName } from "../screens/browse/browse-screen";
import { ChapterScreen, ChapterScreenName } from "../screens/chapter/chapter-screen";
import { FavoriteScreen, FavoriteScreenName } from "../screens/favorite/favorite-screen";
import { HistoryScreen, HistoryScreenName } from "../screens/history/history-screen";
import { NovelDetailScreen, NovelDetailScreenName } from "../screens/novel-detail/novel-detail-screen";
import { NovelListScreen, NovelListScreenName } from "../screens/novel-list/novel-list-screen";
import { SplashScreen, SplashScreenName } from "../screens/splash/splash-screen";

import { MainStack, MainStackName } from "./main-navigators";
import { color } from "../theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Define the screen input parameters
export type NavigatorParamList = {
    [AboutScreenName]: undefined
    [BrowseScreenName]: undefined
    [ChapterScreenName]:
    {
        header: string,
        data:{

        }
    }
    [FavoriteScreenName]: undefined
    [HistoryScreenName]: undefined
    [NovelDetailScreenName]:
    {
        header: string,
        data: {

        }
    }
    [NovelListScreenName]:
    {
        header: string,
        data: {

        }
    }
    [SplashScreenName]: undefined
    [MainStackName]: undefined
}

const Stack = createNativeStackNavigator<NavigatorParamList>()

function AppStack() {
    return (
        <Stack.Navigator
            initialRouteName={MainStackName}
            screenOptions={{
                //headerShown: false
            }}
        >
            <Stack.Screen
                name={SplashScreenName}
                component={SplashScreen}
                
            />
            <Stack.Screen
                name={MainStackName}
                component={MainStack}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={NovelListScreenName}
                component={NovelListScreen}
                options={
                    ({ route }) => ({ title: route.params.header })
                }
            />
            <Stack.Screen
                name={NovelDetailScreenName}
                component={NovelDetailScreen}
            />
            <Stack.Screen
                name={ChapterScreenName}
                component={ChapterScreen}
            />
        </Stack.Navigator>
    )
}

export function AppNavigator() {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}

AppNavigator.displayName = "AppNavigator"