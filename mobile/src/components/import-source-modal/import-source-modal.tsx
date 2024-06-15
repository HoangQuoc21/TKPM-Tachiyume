import * as React from 'react';
import { flatten } from "ramda"
import { observer } from "mobx-react-lite"

import { useState, useContext } from 'react';
import { useToast } from "react-native-toast-notifications";

import { View, Text, Modal, TouchableOpacity, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';

import { ImportSourceModalProps } from './import-source-modal.props';
import { stylePresets } from './import-source-modal.presets';

import { Column } from '../column/column';
import { Row } from '../row/row';
import { TextInput } from '../text-input/text-input';

import { translate } from '../../i18n'

// Import the models
import Source from '../../models/sources/source';
import { SourcePlugin } from '../../factories/source-plugin';

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

    const onImportPress = async () => {
        if (importURL === '') {
            toast.show(translate("error.noSourceChose"), { type: 'warning' })
            return
        }

        const importSource = await SourcePlugin.getSource(importURL)
        console.log(importSource)
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
    const [file, setFile] = useState(null)
    const handleFileImport = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.allFiles],
            });
            setFile(res);
            setImportURL(res.uri)
        }
        catch (e){
            if (DocumentPicker.isCancel(e)){
                console.log("Cancel import file")
            }
            else{
                throw e;
            }
        }
    };

    const renderPicker = () => {
        return (
            // <DropDownPicker
            //     open={pickerOpen}
            //     value={importURL}
            //     items={sourceImportURLs}
            //     setOpen={setPickerOpen}
            //     setValue={setImportURL}
            //     placeholder={translate("imporSourcetModal.chooseSource")}
            //     placeholderStyle={{ color: color.ligthTheme.text }}
            //     autoScroll={true}
            // />
            <View>
            <TouchableOpacity onPress={handleFileImport}> 
                <Text>Import File</Text>
            </TouchableOpacity>
            {file && (
              <View>
                <Text>File Name: {file.name}</Text>
                <Text>File Type: {file.type}</Text>
                <Text>File URI: {file.uri}</Text>
              </View>
            )}
          </View>
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