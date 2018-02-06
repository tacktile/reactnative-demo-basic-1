'use strict';

import React, { Component } from 'react';

//Redux requirments
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actionss from '../actions/index';

//UI requirements
import Swiper from 'react-native-swiper';
import { Image, ListView, TouchableOpacity, Overlay, Screen, View, Text, Divider } from '@shoutem/ui';
import { StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import ImportImage from './importImage';
import {Actions} from 'react-native-router-flux';

var { height, width } = Dimensions.get('window');
var offerWidth = width-10;
var offerHeight = height-10;

class Home extends Component {
    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount() {
        this.props.getData(); //call our action
    }

    renderRow(resto) {
        return (
            <TouchableOpacity
                onPress={() => Actions.menu({id: resto.id, title: resto.name})}
                style={styles.restaurant}
            >
                <ImportImage
                    id= {resto.id}
                    name= {resto.name}
                />
                <Divider styleName="line" />
            </TouchableOpacity>
        );
    }

    render() {
        if (this.props.loading) {
            return (
                <ActivityIndicator size='large' color='#45af48'/>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Swiper
                        loop={true}
                        autoplay={true}
                        style={styles.offers}
                        dot={<View style={styles.dot} />}
                        activeDot={<View style={styles.activeDot} />}
                    >
                        <Image
                            style={{flex: 1, width: offerWidth}}
                            source={require('../../images/offers/offer1.jpg')}
                        />
                        <Image
                            style={{flex: 1, width: offerWidth}}
                            source={require('../../images/offers/offer2.jpg')}
                        />
                        <Image
                        style={{flex: 1, width: offerWidth}}
                            source={require('../../images/offers/offer3.jpg')}
                        />
                    </Swiper>

                    <View style={styles.list}>
                        <ListView
                            data={this.props.data}
                            renderRow={this.renderRow}
                        />
                    </View>
                </View>
            );
        }
    }
};


// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
   return {
       loading: state.dataReducer.loading,
       data: state.dataReducer.data
   }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actionss, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column'
    },

    offers: {
        flex: 1,
        width: offerWidth,
        margin: 5,
        padding: 5,
        backgroundColor: 'white'
    },

    list: {
        flex: 4,
        width: width
    },

    dot: {
        backgroundColor:'rgba(0,0,0,.2)',
        width: 8,
        height: 2,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3
    },

    activeDot: {
        backgroundColor: '#888888',
        width: 10,
        height: 2,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3
    }
};