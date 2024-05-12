import * as React from 'react';
import {flatten} from "ramda"
import { observer } from "mobx-react-lite"
//Import the Props interface
import { LogoProps } from './logo.props';
//Import the prop and style presets
import { stylePresets } from './logo.presets';
import { View, Image } from 'react-native';

//Define the logo image uri
const logoUri = require("./logo.png")

export const Logo = observer(function Logo(props: LogoProps) {
    //Destructure the props
    const {
        preset = "default",
        overridStyle,
        overrideImageStyle,
        ...rest
    } = props

    //Flatten the styles
    const containerStyles = flatten([stylePresets[preset].CONTAINER, overridStyle])
    const imageStyles = flatten([stylePresets[preset].IMAGE, overrideImageStyle])

    return (
        <View style={containerStyles}>
            <Image 
                style={imageStyles}
                source={logoUri} 
            />
        </View>
    )
})