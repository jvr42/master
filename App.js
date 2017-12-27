import React from 'react';

import {
  TabNavigator
} from 'react-navigation';

import { View } from 'react-native';
import { Provider } from 'react-redux';

import store from './store';
import ProfilePicture from './screens/ProfilePicture';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Main from './screens/Main';
import Transactions from './screens/Transactions';
import Categories from './screens/Categories';

export default class App extends React.Component {

  render(){
    const MainNavigator = TabNavigator({
        login: {
            screen: Login,
            navigationOptions: {
                tabBarVisible: false
            }
        },
        signup: {
            screen: SignUp,
            navigationOptions: {
                tabBarVisible: false
            }
        },
        app: {
            screen: TabNavigator({
                main: {
                    screen: Main,
                    navigationOptions: {
                        tabBarVisible: false
                    }
                },
                categories: {
                    screen: Categories,
                    navigationOptions: {
                        tabBarVisible: false
                    }
                },
                transaction: {
                    screen: Transactions,
                    navigationOptions: {
                        tabBarVisible: false
                    }
                }
            }, {
                swipeEnabled: false,
                animationEnabled: false,
                lazy: true
            })
        }
    }, {
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true
    })


    return (
      <Provider store={store}>
      <View style={{flex: 1}}>
        <MainNavigator/>
      </View>
      </Provider>
    );
  }
}
