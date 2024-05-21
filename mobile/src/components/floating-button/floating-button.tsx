import * as React from 'react';
import { flatten } from "ramda"
import { observer } from "mobx-react-lite"

import { TouchableOpacity } from 'react-native';

import { FloatingButtonProps } from './floating-button.props';
import { stylePresets } from './floating-button.presets';

import { VectorIcon } from '../vector-icon/vector-icon';
import { Column } from '../column/column';
import { iconSize } from '../../theme';

export const FloatingButton = observer(function FloatingButton(props: FloatingButtonProps) {
    //Destructure the props
    const {
        preset = "default",
        style: overideStyle,
        icon,
        onPress,
    } = props

    //Flatten the styles
    const containerStyle = flatten([stylePresets[preset].CONTAINER], overideStyle)

    return (
        <TouchableOpacity
            style={containerStyle}
            onPress={onPress}
        >
            <VectorIcon
                name={icon}
                size={iconSize.medium}
            />
        </TouchableOpacity>
    )
})