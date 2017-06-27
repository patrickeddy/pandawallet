import React from 'react';
import {
  StackNavigator
} from 'react-navigation';

// IMPORT SCREENS
import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen';

// NAVIGATION CONFIGURATION
const AppNavigation = StackNavigator({
  Home: { screen: HomeScreen},
  Transaction: { screen: TransactionScreen}
});

export default class RootNavigation extends React.Component{
  render() {
    return <AppNavigation></AppNavigation>
  }
}
