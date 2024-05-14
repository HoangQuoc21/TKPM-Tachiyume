import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { AboutScreen, AboutScreenName } from "../screens/about/about-screen"
import { BrowseScreen, BrowseScreenName } from "../screens/browse/browse-screen"
import { FavoriteScreen, FavoriteScreenName } from "../screens/favorite/favorite-screen"
import { HistoryScreen, HistoryScreenName } from "../screens/history/history-screen"
import { NavigatorParamList } from './app-navigator'

// Import custom components
import { color as customColor, radius } from "../theme"
import { VectorIcon } from "../components/vector-icon/vector-icon"
import i18n from "../i18n"
import { Row } from "../components/row/row"


const Tab = createBottomTabNavigator<NavigatorParamList>()

export const MainStackName = "mainStack"

const iconSize = 15;
const labelSize = 13;

export function MainStack() {
    return (
        <Tab.Navigator
            initialRouteName={BrowseScreenName}
            screenOptions={{
                tabBarActiveTintColor: customColor.ligthTheme.accent,
                tabBarInactiveTintColor: customColor.ligthTheme.inactive,
                tabBarStyle: {
                    backgroundColor: customColor.ligthTheme.secondary,
                    height:60,
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
                    tabBarIcon({ color, focused }) {
                        return (
                            focused ? <Row style={{
                                backgroundColor: customColor.ligthTheme.accentSecondary,
                                borderRadius: radius[5],
                                height:30,
                                width:60,
                                justifyContent:"center",
                                alignItems:"center"
                            }}>
                                <VectorIcon name={"heart"} color={color} size={iconSize} />
                            </Row> : <VectorIcon name={"heart"} color={color} size={iconSize} />
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
                    tabBarIcon({ color, focused }) {
                        return (
                            focused ? <Row style={{
                                backgroundColor: customColor.ligthTheme.accentSecondary,
                                borderRadius: radius[5],
                                opacity: 1,
                                height: 30,
                                width: 60,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <VectorIcon name={"compass-outline"} color={color} size={iconSize} />
                            </Row> : <VectorIcon name={"compass-outline"} color={color} size={iconSize} />
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
                    tabBarIcon({ color, focused }) {
                        return (
                            focused ? <Row style={{
                                backgroundColor: customColor.ligthTheme.accentSecondary,
                                borderRadius: radius[5],
                                opacity: 1,
                                height: 30,
                                width: 60,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <VectorIcon name={"reload-outline"} color={color} size={iconSize} />
                            </Row> : <VectorIcon name={"reload-outline"} color={color} size={iconSize} />
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
                    tabBarIcon({ color, focused }) {
                        return (
                            focused ? <Row style={{
                                backgroundColor: customColor.ligthTheme.accentSecondary,
                                borderRadius: radius[5],
                                opacity: 1,
                                height: 30,
                                width: 60,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <VectorIcon name={"information-circle-outline"} color={color} size={iconSize} />
                            </Row> : <VectorIcon name={"information-circle-outline"} color={color} size={iconSize} />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    );
}