import Expo from 'expo';
import React from 'react';
import Nav from './navigation/RootNavigation';

export default class App extends React.Component {
  render() {
    return (
      <Nav />
    );
  }
}

Expo.registerRootComponent(App);
