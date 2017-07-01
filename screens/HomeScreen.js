import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native';
import Button from 'react-native-button'
import MoneyText from '../components/MoneyText';
import PriceCalendar from '../components/PriceCalendar';
import BalanceHelper from '../helpers/BalanceHelper.js';
import TransactionButtons from '../components/TransactionButtons';

export default class HomeScreen extends React.Component {

  state = {
      balance: 0
  }

  componentWillMount() {
    //========= DEBUG ONLY ===========
    // global.storage.remove({ key: "balance" })
    // global.storage.remove({ key: "datehistories" });
    //================================
    // Add listener for balance update
    DeviceEventEmitter.addListener('updateBalance', (e)=>{
      console.log("BALANCE UPDATE CAUGHT!");
      this._retrieveBalance();
    });
    // Retrieve the balance from the local store
    this._retrieveBalance();
  }

  _retrieveBalance(){
    BalanceHelper.get()
    .then(balance=>{
      // Set the state balance
      this.setState({balance: balance});
    }).catch(err=>{
      console.warn(err.message);
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.state.balance != nextState.balance) return true;
    return false;
  }

  static navigationOptions = ({navigation})=>{
    const buttons = <TransactionButtons navigation={navigation}/>
    return {
      title: global.APPNAME,
      headerRight: buttons
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <MoneyText style={styles.balance} amount={this.state.balance} />
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
});
