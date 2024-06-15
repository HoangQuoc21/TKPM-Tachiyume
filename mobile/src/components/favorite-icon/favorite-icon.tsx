import * as React from "react";
import { observer } from "mobx-react-lite";
import { flatten } from "cheerio/lib/options";
import { FavoriteIconProps } from "./favorite-icon.props";
import { stylePresets } from "./favorite-icon.presets";
import { TouchableOpacity } from "react-native";

import { VectorIcon } from "../vector-icon/vector-icon";
import { color, iconSize } from "../../theme";

export const FavoriteIcon = observer(function FavoriteIcon(props: FavoriteIconProps) {
    const { preset = "default", style: styleOverride, value, onPress, ...rest } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <VectorIcon
                name={"heart"}
                size={iconSize.large}
                color= {value ? color.common.pink : "gray"}
            />
        </TouchableOpacity>
       
    );
})