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
        style={styles.container}
        onDayPress={()=> navigate('Transaction')}
        maxDate={Date()} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch"
  }
});
