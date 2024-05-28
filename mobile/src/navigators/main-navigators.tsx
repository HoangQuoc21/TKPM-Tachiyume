import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { AboutScreen, AboutScreenName } from "../screens/about/about-screen"
import { BrowseScreen, BrowseScreenName } from "../screens/browse/browse-screen"
import { FavoriteScreen, FavoriteScreenName } from "../screens/favorite/favorite-screen"
import { HistoryScreen, HistoryScreenName } from "../screens/history/history-screen"
import { NavigatorParamList } from './app-navigator'
import { Animated, Dimensions } from 'react-native';

// Import system components
import { Text } from "react-native"

// Import custom components
import { color as customColor, radius, iconSize, spacing, shadow } from "../theme"
import { VectorIcon } from "../components/vector-icon/vector-icon"
import { Row } from "../components/row/row"
import { Header } from "../components/header/header"

// Import i18n for translations
import { translate } from "../i18n"


const Tab = createBottomTabNavigator<NavigatorParamList>()

export const MainStackName = "mainStack"

const icon = {
    size: iconSize.small,
    containerHeight: 30,
    containerWidth: 60,
}

const labelSize = 13;
const tabBarHeight = 55;

const SCREEN_WIDTH = Dimensions.get('window').width

export function MainStack() {
    return (
        <Tab.Navigator
            initialRouteName={BrowseScreenName}
            screenOptions={{
                tabBarActiveTintColor: customColor.ligthTheme.accent,
                tabBarInactiveTintColor: customColor.ligthTheme.inactive,
                tabBarStyle: {
                    backgroundColor: customColor.ligthTheme.secondary,
                    height: tabBarHeight,
                    position: "absolute",
                    left: spacing[3],
                    right: spacing[3],
                    borderTopLeftRadius: radius[5],
                    borderTopRightRadius: radius[5],
                    ...shadow.default,
                },
                // Add this to clear the remaining data when the screen is not focused
                unmountOnBlur: true,
                // Add this to hide the tab bar when the keyboard is open
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen
                name={FavoriteScreenName}
                component={FavoriteScreen}
                options={{
                    tabBarLabel: translate("mainTab.favorite"),
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontSize: labelSize,
                    },
                    header() {
                        return <Header title={translate("mainTab.favorite")} />
                    },
                    tabBarIcon({ color, focused }) {
                        return (
                            focused ? <Row style={{
                                backgroundColor: customColor.ligthTheme.accentSecondary,
                                borderRadius: radius[5],
                                height: icon.containerHeight,
                                width: icon.containerWidth,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <VectorIcon name={"heart"} color={color} size={icon.size} />
                            </Row> : <VectorIcon name={"heart"} color={color} size={icon.size} />
                        )
                    },
                }}
            />
            <Tab.Screen
                name={BrowseScreenName}
                component={BrowseScreen}
                options={{
                    tabBarLabel: translate("mainTab.browse"),
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontSize: labelSize,
                    },
                    header() {
                        return <Header title={translate("mainTab.browse")} />
                    },
                    tabBarIcon({ color, focused }) {
                        return (
                            focused ? <Row style={{
                                backgroundColor: customColor.ligthTheme.accentSecondary,
                                borderRadius: radius[5],
                                height: icon.containerHeight,
                                width: icon.containerWidth,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <VectorIcon name={"compass-outline"} color={color} size={icon.size} />
                            </Row> : <VectorIcon name={"compass-outline"} color={color} size={icon.size} />
                        )
                    },
                }}
            />
            <Tab.Screen
                name={HistoryScreenName}
                component={HistoryScreen}
                options={{
                    tabBarLabel: translate("mainTab.history"),
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontSize: labelSize,
                    },
                    header() {
                        return <Header title={translate("mainTab.history")} />
                    },
                    tabBarIcon({ color, focused }) {
                        return (
                            focused ? <Row style={{
                                backgroundColor: customColor.ligthTheme.accentSecondary,
                                borderRadius: radius[5],
                                height: icon.containerHeight,
                                width: icon.containerWidth,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <VectorIcon name={"reload-outline"} color={color} size={icon.size} />
                            </Row> : <VectorIcon name={"reload-outline"} color={color} size={icon.size} />
                        )
                    },
                }}
            />
            <Tab.Screen
                name={AboutScreenName}
                component={AboutScreen}
                options={{
                    tabBarLabel: translate("mainTab.about"),
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontSize: labelSize,
                    },
                    header() {
                        return <Header title={translate("mainTab.about")} />
                    },
                    tabBarIcon({ color, focused }) {
                        return (
                            focused ? <Row style={{
                                backgroundColor: customColor.ligthTheme.accentSecondary,
                                borderRadius: radius[5],
                                height: icon.containerHeight,
                                width: icon.containerWidth,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <VectorIcon name={"information-circle-outline"} color={color} size={icon.size} />
                            </Row> : <VectorIcon name={"information-circle-outline"} color={color} size={icon.size} />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    );
}