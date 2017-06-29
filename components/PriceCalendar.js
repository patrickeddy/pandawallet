import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

import { Calendar } from 'react-native-calendars';

export default class PriceCalendar extends React.Component {
  render(){
    const { navigate } = this.props.navigation;
    return(
      <Calendar
        style={this.props.style}
        onDayPress={(day)=> navigate('DateHistory', {day})}
        selectedDayBackgroundColor="blue"
        hideExtraDays={true}
        maxDate={Date()} />
    );
  }
}
