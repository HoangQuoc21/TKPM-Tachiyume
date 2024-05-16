import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { AboutScreen, AboutScreenName } from "../screens/about/about-screen"
import { BrowseScreen, BrowseScreenName } from "../screens/browse/browse-screen"
import { FavoriteScreen, FavoriteScreenName } from "../screens/favorite/favorite-screen"
import { HistoryScreen, HistoryScreenName } from "../screens/history/history-screen"
import { NavigatorParamList } from './app-navigator'

// Import system components
import { Text } from "react-native"

// Import custom components
import { color as customColor, radius, iconSize } from "../theme"
import { VectorIcon } from "../components/vector-icon/vector-icon"
import { Row } from "../components/row/row"
import { Header } from "../components/header/header"

// Import i18n for translations
import i18n from "../i18n"


const Tab = createBottomTabNavigator<NavigatorParamList>()

export const MainStackName = "mainStack"

const icon = {
    size: iconSize.small,
    containerHeight: 30,
    containerWidth: 60,
}

const labelSize = 13;
const tabBarHeight = 60;

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
                },
            }}
        >
            <Tab.Screen
                name={FavoriteScreenName}
                component={FavoriteScreen}
                options={{
                    tabBarLabel: i18n.t("mainTab.favorite"),
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontSize: labelSize,
                    },
                    header(){
                        return <Header title={i18n.t("mainTab.favorite")} />
                    },
                    tabBarIcon({ color, focused }) {
                        return (
                            focused ? <Row style={{
                                backgroundColor: customColor.ligthTheme.accentSecondary,
                                borderRadius: radius[5],
                                height: icon.containerHeight,
                                width: icon.containerWidth,
                                justifyContent:"center",
                                alignItems:"center"
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
                    tabBarLabel: i18n.t("mainTab.browse"),
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontSize: labelSize,
                    },
                    header() {
                        return <Header title={i18n.t("mainTab.browse")} />
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
                    tabBarLabel: i18n.t("mainTab.history"),
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontSize: labelSize,
                    },
                    header() {
                        return <Header title={i18n.t("mainTab.history")} />
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
                    tabBarLabel: i18n.t("mainTab.about"),
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontSize: labelSize,
                    },
                    header() {
                        return <Header title={i18n.t("mainTab.about")} />
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