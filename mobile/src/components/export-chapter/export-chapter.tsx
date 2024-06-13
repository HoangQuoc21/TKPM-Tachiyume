import * as React from 'react';
import { flatten } from "ramda"
import { observer } from "mobx-react-lite"

import { useState, useContext } from 'react';
import { useToast } from "react-native-toast-notifications";

import { Text, Modal, TouchableOpacity, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { ExportChapterProps } from './export-chapter.props';
import { stylePresets } from './export-chapter.presets';

import { Column } from '../column/column';
import { Row } from '../row/row';
import { TextInput } from '../text-input/text-input';

import { translate } from '../../i18n'

import { color, radius, spacing } from '../../theme';

import { fileFormats, exportFile} from '../../export/fileGenerators'; // Import các hàm đã tạo
import { SourceFactory } from '../../factories/source-factory';
import { useEffect} from "react";
import Chapter from '../../models/chapter';

export const ExportChapter = observer(function ExportChapter(props: ExportChapterProps) {
    //Destructure the props
    const {
        preset = "default",
        isVisible,
        onClosePress,
        source, 
        chapter
    } = props

    //Flatten the styles
    const overlayContainerStyle = flatten([stylePresets[preset].OVERLAY_CONTAINER])
    const modalContainerStyle = flatten([stylePresets[preset].MODAL_CONTAINER])
    const titleStyle = flatten([stylePresets[preset].TITLE])
    const buttonContainer = flatten([stylePresets[preset].BUTTON_CONTAINER])
    const buttonStyle = flatten([stylePresets[preset].BUTTON])
    const buttonTextStyle = flatten([stylePresets[preset].BUTTON_TEXT])

    //The file format:
    const [fileFormat, setFileFormat] = useState('')
    const [chapterContent, setChapterContent] = useState<Chapter | null>(null);


    const toast = useToast();

    const initChapterContent = async (source) => {
        //console.log(`Source ID in Chapter Content: ${source.id}`); 
        const chapterSource = SourceFactory.createSource(source.id);
        await chapterSource.findContentByChapter(chapter).then((chapter) => {
          setChapterContent(chapter.content);
        }).catch((error) => {
          console.error('Error finding chapters by page:', error);
        });
    };

    useEffect(() => {
    initChapterContent(source);
    }, [source]);

    const renderTitle = () => {
        return (
            <Text style={titleStyle}>{translate("exportChapter.title")}</Text>
        )
    }

    const onCancelPress = () => {
        onClosePress()
        setFileFormat('')
    }

    const onImportPress = () => {
        if (fileFormat === '') {
            toast.show(translate("error.noFormatSelected"), { type: 'warning' })
            return
        }

        exportFile(fileFormat, chapter.title, chapterContent);
        setFileFormat('')
        onClosePress()
    }

    const [pickerOpen, setPickerOpen] = useState(false);

    const renderPicker = () => {
        return (
            <DropDownPicker
                open={pickerOpen}
                value={fileFormat}
                items={fileFormats}
                setOpen={setPickerOpen}
                setValue={setFileFormat}
                placeholder={translate("exportChapter.select")}
                placeholderStyle={{ color: color.lightTheme.text }}
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
                    <Text style={buttonTextStyle}>{translate("exportChapter.export")}</Text>
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