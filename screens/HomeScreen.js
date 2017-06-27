import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
import { PriceCalendar } from '../components/PriceCalendar';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation})=>({
    title: "HomeScreen",
    headerRight: (
      <View>
        <Button onPress={() => navigation.navigate('Transaction')} title="+" style={styles.addButton} />
      </View>
    )
  });
  render() {
    return (
      <View style={styles.container}>
        <Text>Calendar is below.</Text>
        <PriceCalendar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  addButton: {
    padding: 15
  },
});
