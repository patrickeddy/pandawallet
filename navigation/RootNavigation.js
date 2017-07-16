import React from 'react';
import {
  StackNavigator
} from 'react-navigation';

// IMPORT SCREENS
import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen';
import DateHistoryScreen from '../screens/DateHistoryScreen';
import AnalyzeScreen from '../screens/AnalyzeScreen';

// NAVIGATION CONFIGURATION
const AppNavigation = StackNavigator({
  Home: { screen: HomeScreen},
  Transaction: { screen: TransactionScreen},
  DateHistory: { screen: DateHistoryScreen},
  Analyze : { screen: AnalyzeScreen}
});

export default class RootNavigation extends React.Component{
  render() {
    return <AppNavigation style={{
      marginTop: Expo.Constants.statusBarHeight
    }}/>
  }
}
