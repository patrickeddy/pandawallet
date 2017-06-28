import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native';
import Button from 'react-native-button'
import PriceCalendar from '../components/PriceCalendar';

export default class HomeScreen extends React.Component {

  state = {
      balance: 0
  }

  _retrieveBalance(){
    storage.load({
      key: 'balance'
    }).then(ret=>{
      // Set the state balance
      this.setState({balance: ret});
    }).catch(err=>{
      console.warn(err.message);
      if (err.name == "NotFoundError") {
        // CREATE THE BALANCE OBJECT
        storage.save({
          key: 'balance',
          data: 0
        }).then(ret=>console.log("Created balance entry in storage."))
        .catch(err=>console.log(err.message))
      }
    });
  }

  _updateBalance(newBalance) {
    this.state.balance = newBalance;
  }

  componentWillMount() {
    //========= DEBUG ONLY ===========
    // storage.remove({ key: "balance" })
    //================================
    // Add listener for balance update
    DeviceEventEmitter.addListener('updateBalance', (e)=>{
      console.log("BALANCE UPDATE CAUGHT!");
      this._retrieveBalance();
    });
    // Retrieve the balance from the local store
    this._retrieveBalance();
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.state.balance != nextState.balance) return true;
    return false;
  }

  static navigationOptions = ({navigation})=>{
    const buttons = (
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
      headerRight: buttons
    };
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
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
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
    padding: 20,
    margin: 10,
    backgroundColor: 'blue',
    borderRadius: 50
  },
  tButton: {
    color: 'white',
    borderRadius: 100
  }
});
