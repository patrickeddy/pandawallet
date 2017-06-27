import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';

import { Calendar } from 'react-native-calendars';

export default class PriceCalendar extends React.Component {
  render(){
    const { navigate } = this.props.navigation;
    return(
      <Calendar
        style={this.props.style}
        onDayPress={()=> navigate('Transaction')}
        maxDate={Date()} />
    );
  }
}
