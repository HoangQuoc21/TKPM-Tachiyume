import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation-utilities";

import { AboutScreen, AboutScreenName } from "../screens/about/about-screen";
import {
  BrowseScreen,
  BrowseScreenName,
} from "../screens/browse/browse-screen";
import {
  ChapterScreen,
  ChapterScreenName,
} from "../screens/chapter/chapter-screen";
import {
  FavoriteScreen,
  FavoriteScreenName,
} from "../screens/favorite/favorite-screen";
import {
  HistoryScreen,
  HistoryScreenName,
} from "../screens/history/history-screen";
import {
  NovelDetailScreen,
  NovelDetailScreenName,
} from "../screens/novel-detail/novel-detail-screen";
import {
  NovelListScreen,
  NovelListScreenName,
} from "../screens/novel-list/novel-list-screen";
import {
  SplashScreen,
  SplashScreenName,
} from "../screens/splash/splash-screen";

import { MainStack, MainStackName } from "./main-navigators";
import { color } from "../theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Header } from "../components/header/header";
import { translate } from "../i18n";

import Source from "../models/sources/source";
import Novel from "../models/novel";
import Chapter from "../models/chapter";

// Define the screen input parameters
export type NavigatorParamList = {
  [AboutScreenName]: undefined;
  [BrowseScreenName]: undefined;
  [ChapterScreenName]: {
    title: string;
    subTitle: string;
    data: {
      source: Source;
      novel: Novel;
      chapter: Chapter;
    };
  };
  [FavoriteScreenName]: undefined;
  [HistoryScreenName]: undefined;
  [NovelDetailScreenName]: {
    header: string;
    data: {
      source: Source;
      novel: Novel;
    };
  };
  [NovelListScreenName]: {
    header: string;
    data: {
      source: Source;
    };
  };
  [SplashScreenName]: undefined;
  [MainStackName]: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={SplashScreenName}
      screenOptions={
        {
          //headerShown: false
        }
      }
    >
      <Stack.Screen
        name={SplashScreenName}
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={MainStackName}
        component={MainStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NovelListScreenName}
        component={NovelListScreen}
        options={({ route }) => ({
          header: () => <Header title={route.params.header} canGoBack />,
        })}
      />
      <Stack.Screen
        name={NovelDetailScreenName}
        component={NovelDetailScreen}
        options={({ route }) => ({
          header: () => <Header canGoBack />,
        })}
      />
      <Stack.Screen
        name={ChapterScreenName}
        component={ChapterScreen}
        options={({ route }) => ({
          header: () => <Header title={route.params.title} subtitle={route.params.subTitle} canGoBack />,
        })}
      />
    </Stack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack />
    </NavigationContainer>
  );
}

AppNavigator.displayName = "AppNavigator";
