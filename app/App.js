import React, { Component } from 'react';
import { Router, Scene} from 'react-native-router-flux';

//Redux requirements
import { Provider } from 'react-redux';
import store from './store';
import Menu from './components/menu';
import Home from './components/home';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Provider store={store}>
                <Router>
                    <Scene key='root'>
                        <Scene key='home'
                            component={Home}
                            title="FOOD APP"/>

                        <Scene key='menu'
                            component={Menu} />
                    </Scene>
                </Router>
            </Provider>
        )
    }
}
