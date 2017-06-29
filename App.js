import Expo from 'expo';
import React from 'react';
import Nav from './navigation/RootNavigation';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import DateHistoriesHelper from './helpers/DateHistoriesHelper';

export default class App extends React.Component {
  render() {
    return (
      <Nav />
    );
  }
}

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
});
global.storage = storage;

const dhHelper = new DateHistoriesHelper();
global.dhHelper = dhHelper;

Expo.registerRootComponent(App);
