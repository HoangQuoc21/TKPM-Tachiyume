import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import styles from "./novel-detail-screen.styles";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { MainStackName } from "../../navigators/main-navigators";
import { NavigatorParamList } from "../../navigators/app-navigator";

// Import the custom components
import { Screen } from "../../components/screen/screen";
import { Column } from "../../components/column/column";
import { NovelDetail } from "../../components/novel-detail/novel-detail";
import { ChapterList } from "../../components/chapter-list/chapter-list";
import { ScrollView } from "react-native-gesture-handler";
//import i18n from '../../i18n'

export const NovelDetailScreen: FC<
  StackScreenProps<NavigatorParamList, typeof NovelDetailScreenName>
> = observer(({ navigation, route }) => {
  const { header, data } = route.params;
  const source = data.source;
  const novel = data.novel;



  const renderNovelDetail = () => {
    return <NovelDetail source={source} novel={novel} />;
  };

  return (
    <Screen style={styles.ROOT} preset="fixed" unsafe>
      {renderNovelDetail()}
    </Screen>
  );
});

export const NovelDetailScreenName = "novelDetail";
