import * as React from 'react';
import { flatten } from "ramda"
import { observer } from "mobx-react-lite"

import { useState, useContext } from 'react';
import { useToast } from "react-native-toast-notifications";

import { Text, Modal, TouchableOpacity, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { ImportSourceModalProps } from './import-source-modal.props';
import { stylePresets } from './import-source-modal.presets';

import { Column } from '../column/column';
import { Row } from '../row/row';
import { TextInput } from '../text-input/text-input';

import { translate } from '../../i18n'

// Import the models
import Source from '../../models/sources/source';
import { sourceImportURLs, SourceFactory } from '../../factories/source-factory';

// Import the contexts
import { NovelSourceListContext } from '../../providers/novel-source-list-provider';

//import { addSource as addSourceToStorage } from '../../storages/novel-sources-storage';
import { color, radius, spacing } from '../../theme';

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
    const [importURL, setImportURL] = useState('')

    //Get the source list from the context
    //Go to the NovelSourceListProvider to know all the methods available
    const [sourceList, addSourceToStorage, removeSourceFromStorage, clearSourcesFromStorage] = useContext(NovelSourceListContext);

    const toast = useToast();

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
                value={importURL}
                onChangeText={setImportURL}
                inputMode='url'
                onTextClear={() => setImportURL('')}
                enableEdit={false}
            />
        )
    }

    const onCancelPress = () => {
        onClosePress()
        setImportURL('')
    }

    const addSource = async (importSource: Source) => {
        await addSourceToStorage(importSource);
    };

    // Check if the import source is already in the source list
    const isSourceInList = (importSource: Source) => {
        return sourceList.some((source: Source) => source.id === importSource.id);
    }

    const onImportPress = () => {
        if (importURL === '') {
            toast.show(translate("error.noSouceChoose"), { type: 'warning' })
            return
        }

        const importSource = SourceFactory.getSource(importURL)
        if (!isSourceInList(importSource)) {
            addSource(importSource)
            toast.show(translate("success.importSource"), { type: 'success' })
        }
        else {
            toast.show(translate("error.sourceExisted"), { type: 'warning' })
        }

        setImportURL('')
        onClosePress()
    }

    const [pickerOpen, setPickerOpen] = useState(false);

    const renderPicker = () => {
        return (
            <DropDownPicker
                open={pickerOpen}
                value={importURL}
                items={sourceImportURLs}
                setOpen={setPickerOpen}
                setValue={setImportURL}
                placeholder={translate("imporSourcetModal.chooseSource")}
                placeholderStyle={{ color: color.ligthTheme.text }}
                autoScroll={true}
            />
        )
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
                    {renderPicker()}
                    {renderButtons()}
                </Column>
            </Column>
        </Modal>
    )
})