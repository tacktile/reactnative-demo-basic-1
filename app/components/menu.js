//Redux requirments
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as indexActions from '../actions/index';
import * as orderActions from '../actions/order';

//UI requirements
import React, { Component } from 'react';
import { ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
import { View, Text, ListView, Button } from '@shoutem/ui';
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';

var { height, width } = Dimensions.get('window');

class Menu extends Component {
    constructor(props) {
        super(props);

        this.placeOrder = this.placeOrder.bind(this);
    }

    componentDidMount() {
        this.props.getData();
    }

    placeOrder() {
        this.props.clearOrderState();
        if(this.props.noItems>0) {
            alert('Your order had been successfully placed!');
            Actions.home();
        }
    }

    render() {
        let id = this.props.navigation.state.params.id;
        var instance = this;
        if (this.props.loading) {
            return (
                <Text> Loading</Text>
            );
        } else {
            this.props.data.map(restaurant => {
                if (restaurant.id === id) {
                    instance.menu = restaurant.menu;
                }
            });
        }

        var menuView = [];
        
        //Create swiping menu card
        for(var dishtype of Object.keys(this.menu)) {
            menuView.push(
                <View key={dishtype}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>{dishtype}</Text>
                    </View>
                    <View style={styles.list}>{
                        this.menu[dishtype].map((dish) => {
                            var button = '';

                            this.props.orderedDishes.map((orderedDish) => {
                                if(orderedDish.dishname == dish.dishname) {
                                    button = <View style={styles.modifiedButton}>
                                            <TouchableOpacity 
                                                onPress = {() => this.props.removeOrder(dish.price, dish.dishname)}
                                                style={{paddingLeft: 6, paddingRight: 5}}
                                            >
                                                <Text style={{fontSize: 18, color: 'white'}}>{'--'}</Text>
                                            </TouchableOpacity>
                                            <Text style={{backgroundColor: 'white', color: '#27bd86', paddingLeft: 7,
                                                        paddingRight: 7}}>{orderedDish.number}</Text>
                                            <TouchableOpacity
                                                onPress = {() => this.props.addOrder(dish.price, dish.dishname)}
                                                style={{paddingLeft: 5, paddingRight: 8}}
                                            >
                                                <Text style={{fontSize: 18, color: 'white'}}>{'+'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                }
                            });
                            if(button == '') {
                                button = <Button style={styles.onlyAddButton}
                                                    onPress={() => this.props.addOrder(dish.price, dish.dishname)}>
                                                <Text style ={styles.buttonText}>{'ADD +'}</Text>
                                            </Button>
                            }

                            return(
                                <View key={dish.dishname}
                                        style={styles.dish}>
                                    <View style={styles.dishDetails}>
                                        <Text style={styles.dishName}>{dish.dishname}</Text>
                                        <Text style={styles.dishPrice}>{'$ '+dish.price}</Text>
                                    </View>
                                    <View style={styles.button}>
                                        {button}
                                    </View>
                                </View>
                            )
                        })
                        }
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Swiper
                    style={{flex: 6, width: width, backgroundColor: 'white'}}
                    loop={false}
                    showsPagination={true}
                >{
                    menuView.map((dish) =>{
                        return(dish);
                    })
                }
                </Swiper>
                <View style={{flex: 0.15, flexDirection: 'row', width: width}}>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#27bd86', padding: 5}}>
                        <Image
                            style={{height: 40, width: 40}}
                            source={require('../../images/cart.png')}
                        />
                        <View style={{flexDirection: 'column', paddingLeft: 15}}>
                            <Text style={{color: 'white', fontSize: 10}}>{this.props.noItems+' items IN CART'}</Text>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{'$ '+this.props.totalAmount}</Text>
                            <Text style={{color: 'white', fontSize: 10}}>{'Plus taxes'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity 
                        onPress = {() => this.placeOrder()}
                        style={{flex: 1, backgroundColor: '#1fa574', padding: 15}}
                    >
                        <Text style={{color: 'white', alignSelf: 'center', fontSize: 14, fontWeight: 'bold'}}>
                            {'Order Now !'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data,
        noItems: state.ordersReducer.noItems,
        totalAmount: state.ordersReducer.totalAmount,
        orderedDishes: state.ordersReducer.orderedDishes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...indexActions, ...orderActions}, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const styles = {
    container: {
        flex: 1,
    },

    heading: {
        height: 40,
        width:  width,
        backgroundColor: 'white',
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: 3
    },

    headingText: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    },

    dishName: {
        color: '#323232',
        fontWeight: 'normal',
        fontSize: 18
    },

    dishPrice: {
        color: 'grey',
        fontSize: 15
    },

    button: {
        width: 100
    },

    modifiedButton: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 3,
        justifyContent: 'space-between',
        backgroundColor: '#27bd86',
        borderWidth: 3,
        borderRadius: 15,
        borderColor: '#27bd86'
    },

    buttonText: {
        flex: 1,
        fontSize: 16,
        color: 'white',
        position: 'absolute'
    },

    onlyAddButton: {
        marginLeft: 30,
        marginTop: 5,
        height: 30,
        backgroundColor: '#27bd86',
        borderRadius: 15
    },

    list: {
        padding: 12
    },

    dish: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
        paddingBottom: 6,
        borderBottomColor: '#aea69f',
        borderBottomWidth: 0.6
    },

    dishDetails: {
        flexDirection: 'column',
        width: width - 125 //Screenwidth - 24(LP+RP) - 100(ButtonWidth)
    }
}