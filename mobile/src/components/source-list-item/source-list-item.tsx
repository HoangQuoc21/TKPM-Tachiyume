import * as React from 'react';
import { useNavigation } from "@react-navigation/native"
import { observer } from 'mobx-react-lite';
import { flatten } from 'ramda';
import { SourceListItemProps } from './source-list-item.props';
import { stylePresets } from './source-list-item.presets';

import { Text, Image, TouchableOpacity } from 'react-native';
import { Column } from '../column/column';

import { NovelListScreenName } from '../../screens/novel-list/novel-list-screen';

import { navigate } from '../../navigators/navigation-utilities';

export const SourceListItem = observer(function SourceListItem(props: SourceListItemProps) {
    const {
        preset = "default",
        style: styleOverride,
        item: novelSource,
    } = props;

    const containerStyles = flatten([stylePresets[preset].CONTAINER, styleOverride])
    const imageStyles = flatten([stylePresets[preset].IMAGE])
    const textContainerStyles = flatten([stylePresets[preset].TEXT_CONTAINER])
    const textStyles = flatten([stylePresets[preset].TEXT])

    const handlePress = () => {
        navigate(NovelListScreenName as never, {
            header: novelSource.sourceTitle,
            data: {
                source: novelSource
            }
        })
    }

    return (
        <TouchableOpacity style={containerStyles} onPress={handlePress}>
            <Image
                source={{ uri: novelSource.thumbnail }}
                style={imageStyles}
                resizeMode='contain'
            />
            <Column style={textContainerStyles}>
                <Text style={textStyles}>{novelSource.sourceTitle}</Text>
            </Column>
        </TouchableOpacity>
    )
})