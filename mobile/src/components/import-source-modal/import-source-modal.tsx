import * as React from 'react';
import { flatten } from "ramda"
import { observer } from "mobx-react-lite"

import { useState } from 'react';

import {Text, Modal,TouchableOpacity, TextInput} from 'react-native';

import { ImportSourceModalProps } from './import-source-modal.props';
import { stylePresets } from './import-source-modal.presets';

import { Column } from '../column/column';
import { Row } from '../row/row';
import { VectorIcon } from '../vector-icon/vector-icon';

import {translate} from '../../i18n'

export const ImportSourceModal = observer(function ImportSourceModal(props: ImportSourceModalProps) {
    //Destructure the props
    const {
        preset = "default",
        isVisible,
        onClosePress,
    } = props

    //Flatten the styles
    const overlayContainerStyle = flatten([stylePresets[preset].OVERLAY_CONTAINER])
    const modalContainerStyle = flatten([stylePresets[preset].MODAL_CONTAINER])
    const titleStyle = flatten([stylePresets[preset].TITLE])
    const buttonContainer = flatten([stylePresets[preset].BUTTON_CONTAINER])
    const buttonStyle = flatten([stylePresets[preset].BUTTON])
    const buttonTextStyle = flatten([stylePresets[preset].BUTTON_TEXT])
    const inputContainerStyle = flatten([stylePresets[preset].INPUT_CONTAINER])
    const inputStyle = flatten([stylePresets[preset].INPUT])
    const clearTextButtonStyle = flatten([stylePresets[preset].CLEAR_TEXT_BUTTON])

    //The url input state:
    const [url, setUrl] = useState('')

    
    const renderTitle = () => {
        return (
            <Text style={titleStyle}>{translate("imporSourcetModal.title")}</Text>
        )
    }

    const renderInput = () => {
        return (
            <Row style={inputContainerStyle}>
                <TextInput
                    placeholder={translate("imporSourcetModal.novelUrl")}
                    value={url}
                    onChangeText={setUrl}
                    inputMode='url'
                    style= {inputStyle}
                />
                {
                    url.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setUrl('')}
                            style={clearTextButtonStyle}
                        >
                            <VectorIcon
                                name='close'
                                size={20}
                            />
                        </TouchableOpacity>
                    )
                }
            </Row>
        )
    }

    const onCancelPress = () => {
        onClosePress()
        setUrl('')
    }

    const onImportPress = () => {
        console.log(`--> [Import source modal] import url: ${url}`)
        setUrl('')
        onClosePress()
    }

    const renderButtons = () => {
        return (
            <Row style={buttonContainer}>
                <TouchableOpacity
                    style={buttonStyle}
                    onPress={onCancelPress}
                >
                    <Text style={buttonTextStyle}>{translate("common.cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={buttonStyle}
                    onPress={onImportPress}
                >
                    <Text style={buttonTextStyle}>{translate("imporSourcetModal.import")}</Text>
                </TouchableOpacity>
            </Row>
        )
    }

    return (
        <Modal
            transparent={true}
            visible={isVisible}
        >
            <Column style={overlayContainerStyle}>
                <Column style={modalContainerStyle}>
                    {renderTitle()}
                    {renderInput()}
                    {renderButtons()}
                </Column>
            </Column>
        </Modal>
    )
})