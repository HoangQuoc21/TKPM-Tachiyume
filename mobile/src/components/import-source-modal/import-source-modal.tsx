import * as React from 'react';
import { flatten } from "ramda"
import { observer } from "mobx-react-lite"

import { useState, useContext } from 'react';

import { Text, Modal, TouchableOpacity } from 'react-native';

import { ImportSourceModalProps } from './import-source-modal.props';
import { stylePresets } from './import-source-modal.presets';

import { Column } from '../column/column';
import { Row } from '../row/row';
import { TextInput } from '../text-input/text-input';

import { translate } from '../../i18n'

// Import the models
import Source from '../../models/sources/source';
import SourceFactory from '../../models/source-factory';

// Import the contexts
import { NovelSourceListContext } from '../../providers/novel-source-list-provider';

import { addSourceToStorage as addSourceToStorage } from '../../storages/novel-sources-storage';

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

    //The url input state:
    const [url, setUrl] = useState('')

    //Get the source list from the context
    const [sourceList, setSourceList] = useContext(NovelSourceListContext);


    const renderTitle = () => {
        return (
            <Text style={titleStyle}>{translate("imporSourcetModal.title")}</Text>
        )
    }

    const renderInput = () => {
        return (
            <TextInput
                preset='default'
                placeholder={translate("imporSourcetModal.novelUrl")}
                value={url}
                onChangeText={setUrl}
                inputMode='url'
                onTextClear={() => setUrl('')}
            />
        )
    }

    const onCancelPress = () => {
        onClosePress()
        setUrl('')
    }

    // const addSource = (importSource: Source) => {
    //     setSourceList(prevSourceList => [...prevSourceList, importSource]);
    // }

    // const addSource = async (source: Source) => {
    //     const newSourceList = [...sourceList, source];
    //     setSourceList(newSourceList);
    //     await setSources(newSourceList);
    // };

    const addSource = async (importSource: Source) => {
        const newSourceList = [...sourceList, importSource];
        setSourceList(newSourceList);
        await addSourceToStorage(importSource);
    };

    // Check if the import source is already in the source list
    const isSourceInList = (importSource: Source) => {
        return sourceList.some((source: Source) => source.sourceTitle === importSource.sourceTitle)
    }

    const onImportPress = () => {
        const importSource = SourceFactory.getSource(url)
        if (!importSource) {
            console.log('--> [ImportSourceModal]: Invalid source import')
        }
        else {
            if (!isSourceInList(importSource)) {
                addSource(importSource)
            }
            else {
                console.log('--> [ImportSourceModal]: importing source is already in the list')
            }
        }

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