import React, { Component } from 'react';
import { View, ImageBackground, Text } from 'react-native';

export default class ImportImage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.id) {
            case 1: return (
                <ImageBackground
                    style={styles.imgBckgrnd}
                    styleName="large-banner"
                    source={require('../../images/restaurants/resto1.jpg')}
                >
                    <Text style={styles.name}>{this.props.name}</Text>
                </ImageBackground>
            )

            case 2: return (
                <ImageBackground
                    style={styles.imgBckgrnd}
                    styleName="large-banner"
                    source={require('../../images/restaurants/resto2.jpg')}
                >
                    <Text style={styles.name}>{this.props.name}</Text>
                </ImageBackground>
            )

            case 3: return (
                <ImageBackground
                    style={styles.imgBckgrnd}
                    styleName="large-banner"
                    source={require('../../images/restaurants/resto3.jpg')}
                >
                    <Text style={styles.name}>{this.props.name}</Text>
                </ImageBackground>
            )

            case 4: return (
                <ImageBackground
                    style={styles.imgBckgrnd}
                    styleName="large-banner"
                    source={require('../../images/restaurants/resto4.jpg')}
                >
                    <Text style={styles.name}>{this.props.name}</Text>
                </ImageBackground>
            )

            default: return (
                <ImageBackground
                    style={styles.imgBckgrnd}
                    styleName="large-banner"
                    source={require('../../images/restaurants/resto1.jpg')}
                >
                    <Text style={styles.name}>{this.props.name}</Text>
                </ImageBackground>
            )

            break;
        }
    }
}

const styles = {
    name: {
        fontFamily: 'notoserif',
        color: 'white',
        backgroundColor: 'black',
        opacity: 0.7,
        paddingLeft: 7
    },
    imgBckgrnd: {
        height: 120,
        justifyContent: 'flex-end'
    }
}