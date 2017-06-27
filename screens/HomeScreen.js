import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button'
import PriceCalendar from '../components/PriceCalendar';

export default class HomeScreen extends React.Component {

  state = {
      balance: 0
  }

  componentWillMount() {
    // Retrieve the balance from the local store
    storage.load({
      key: 'balance'
    }).then(ret=>{
      // Set the state balance
      this.setState({balance: ret});
    }).catch(err=>{
      console.warn(err.message);
    });
  }

  static navigationOptions = ({navigation})=>{
    // Setup the button
    const rbs = (
      <View style={styles.transactionButtons}>
        <Button
          onPress={() => navigation.navigate('Transaction', {mode: 1})}
          title="+"
          containerStyle={styles.tButtonContainer}
          style={styles.tButton}
        >+</Button>
        <Button
          onPress={() => navigation.navigate('Transaction', {mode: 0})}
          containerStyle={styles.tButtonContainer}
          style={styles.tButton}
        >-</Button>
      </View>
    );
    return {
      title: "No Money",
      headerRight: rbs
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.balance}>{this.state.balance}</Text>
        <PriceCalendar navigation={this.props.navigation} style={styles.calendar}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  transactionButtons: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  balance: {
    flex: 2,
    alignItems: "flex-end",
    fontWeight: "bold",
    fontSize: 50,
    backgroundColor: 'black',
    color: 'white'
  },
  calendar: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  tButtonContainer: {
    padding: 15,
    margin: 10,
    backgroundColor: 'blue'
  },
  tButton: {
    color: 'white',
    borderRadius: 100
  }
});
