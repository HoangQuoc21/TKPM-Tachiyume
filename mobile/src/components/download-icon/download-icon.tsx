import * as React from "react";
import { observer } from "mobx-react-lite";
import { flatten } from "cheerio/lib/options";
import { DownloadIconProps } from "./download-icon.props";
import { stylePresets } from "./download-icon.presets";
import { TouchableOpacity } from "react-native";

import { VectorIcon } from "../vector-icon/vector-icon";
import { color, iconSize } from "../../theme";

export const DownloadIcon = observer(function DownloadIcon(props: DownloadIconProps) {
    const { preset = "default", style: styleOverride, onPress, ...rest } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <VectorIcon
                name={"download"}
                size={iconSize.medium}
                color= {"gray"}
            />
        </TouchableOpacity>
       
    );
})