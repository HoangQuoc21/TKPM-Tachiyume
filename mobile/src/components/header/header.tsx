import * as React from 'react';
import { flatten } from "ramda"
import { observer } from "mobx-react-lite"

import { Text, TouchableOpacity } from 'react-native';

import { HeaderProps } from './header.props';
import { stylePresets } from './header.presets';


import { Column } from '../column/column';
import { Row } from '../row/row';
import { VectorIcon } from '../vector-icon/vector-icon';

import { iconSize } from '../../theme';
import { goBack } from '../../navigators/navigation-utilities';


export const Header = observer(function Logo(props: HeaderProps) {
    //Destructure the props
    const {
        preset = "default",
        canGoBack = false,
        title,
        subtitle = "",
        rightElement = null,
    } = props

    //Flatten the styles
    const rootStyles = flatten([stylePresets[preset].ROOT])
    const leftContainerStyles = flatten([stylePresets[preset].LEFT_CONTAINER])
    const contentContainerStyles = flatten([stylePresets[preset].CONTENT_CONTAINER])
    const rightContainerStyles = flatten([stylePresets[preset].RIGHT_CONTAINER])
    const titleStyles = flatten([subtitle ? stylePresets[preset].TITLE_WITH_SUBTITLE : stylePresets[preset].TITLE_NORMAL])
    const subtitleStyles = flatten([stylePresets[preset].SUBTITLE])

    const onGoBack = () => {
        goBack()
    }

    const renderLeftElement = () => {
        return (
            <Column style={leftContainerStyles}>
                {canGoBack &&
                    <TouchableOpacity
                        onPress={onGoBack}
                    >
                        <VectorIcon
                            name="chevron-back"
                            size={iconSize.medium}
                        />
                    </TouchableOpacity>
                }
            </Column>
        )
    }

    const renderRightElement = () => {
        return (
            <Column style={rightContainerStyles}>
                {rightElement}
            </Column>
        )
    }

    const renderContent = () => {
        return (
            <Column style={contentContainerStyles}>
                <Text style={titleStyles}>
                    {title}
                </Text>
                {subtitle &&
                    <Text style={subtitleStyles}>
                        {subtitle}
                    </Text>
                }
            </Column>
        )
    }

    return (
        <Row style={rootStyles} alignItems={'center'} justifyContent={'space-around'}>
            {renderLeftElement()}
            {renderContent()}
            {renderRightElement()}
        </Row>
    )
})