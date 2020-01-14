import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {
      createBottomTabNavigator,
      createStackNavigator,
      createAppContainer
} from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import Home from './components/Home';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { FontAwesome } from '@expo/vector-icons';
import { setLocalNotification } from './utils/notifications';

const store = createStore(reducer, applyMiddleware(thunk));

const TabNav = createBottomTabNavigator({
      Home: {
            screen: Home,
            navigationOptions: {
                  tabBarIcon: () => (
                        <FontAwesome name="home" size={30} color={'grey'} />
                  )
            }
      },
      AddDeck: {
            screen: AddDeck,
            navigationOptions: {
                  tabBarIcon: () => (
                        <FontAwesome name="plus" size={30} color={'grey'} />
                  )
            }
      }
});

const TabNavContainer = createAppContainer(TabNav);

const MainNav = createStackNavigator({
      Home: {
            screen: TabNav,
            navigationOptions: {
                  title: 'Flashcard App'
            }
      },
      Deck: {
            screen: Deck,
            navigationOptions: {
                  title: 'Deck'
            }
      },
      Quiz: {
            screen: Quiz,
            navigationOptions: {
                  title: 'Quiz'
            }
      },
      AddCard: {
            screen: AddCard,
            navigationOptions: {
                  title: 'Add Card'
            }
      }
});

const MainNavContainer = createAppContainer(MainNav);

export default class App extends React.Component {
      componentDidMount() {
            setLocalNotification();
      }
      render() {
            return (
                  <Provider store={store}>
                        <View style={styles.container}>
                              <MainNavContainer />
                              {/* <Home /> */}
                        </View>
                  </Provider>
            );
      }
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: '#fff'
      }
});
