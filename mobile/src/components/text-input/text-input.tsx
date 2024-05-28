import * as React from 'react';
import { flatten } from "ramda"
import { observer } from "mobx-react-lite"

import { TextInput as NativeTextInput, TouchableOpacity } from 'react-native';

import { TextInputProps } from './text-input.props';
import { stylePresets } from './text-input.presets';
import { Row } from '../row/row';
import { VectorIcon } from '../vector-icon/vector-icon';
import { iconSize } from '../../theme';

export const TextInput = observer(function TextInput(props: TextInputProps) {
    //Destructure the props
    const {
        preset = "default",
        placeholder,
        value,
        onChangeText,
        inputMode = 'text',
        onTextClear,
        enableEdit = true
    } = props

    //Flatten the styles
    const inputContainerStyle = flatten([stylePresets[preset].INPUT_CONTAINER])
    const inputStyle = flatten([stylePresets[preset].INPUT])
    const clearTextButtonStyle = flatten([stylePresets[preset].CLEAR_TEXT_BUTTON])

    return (
        <Row style={inputContainerStyle}>
            <NativeTextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                inputMode={inputMode}
                style={inputStyle}
                editable={enableEdit}
            />
            {
                value.length > 0 && (
                    <TouchableOpacity
                        onPress={onTextClear}
                        style={clearTextButtonStyle}
                    >
                        <VectorIcon
                            name='close'
                            size={iconSize.small}
                        />
                    </TouchableOpacity>
                )
            }
        </Row>
    )
})