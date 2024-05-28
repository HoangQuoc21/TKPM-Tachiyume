import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import styles from "./novel-list-screen.styles";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { MainStackName } from "../../navigators/main-navigators";
import { NavigatorParamList } from "../../navigators/app-navigator";

// Import the custom components
import { Screen } from "../../components/screen/screen";
import { Column } from "../../components/column/column";
import { translate } from "../../i18n";
import { NovelList } from "../../components/novel-list/novel-list";

import { useRoute } from "@react-navigation/native";
import Source from "../../models/sources/source";

export const NovelListScreen: FC<
  StackScreenProps<NavigatorParamList, typeof NovelListScreenName>
> = observer(({ navigation, route }) => {
  const { header, data } = route.params;
  const { source } = data;

  const renderNovelList = () => {
    return <NovelList source={source} />;
  };

  return (
    <Screen style={styles.ROOT} preset="fixed" unsafe>
      {renderNovelList()}
    </Screen>
  );
});

export const NovelListScreenName = "novelList";
