import * as React from 'react';
import { flatten } from "ramda"
import { observer } from "mobx-react-lite"

import { Text } from 'react-native';

import { MainHeaderProps } from './main-header.props';
import { stylePresets } from './main-header.presets';
import { Column } from '../column/column';


export const MainHeader = observer(function Logo(props: MainHeaderProps) {
    //Destructure the props
    const {
        preset = "default",
        title,
    } = props

    //Flatten the styles
    const containerStyles = flatten([stylePresets[preset].CONTAINER])
    const titleStyles = flatten([stylePresets[preset].TITLE])

    return (
        <Column style={containerStyles} justifyContent="center">
            <Text style={titleStyles}>
                {title}
            </Text>
        </Column>
    )
})