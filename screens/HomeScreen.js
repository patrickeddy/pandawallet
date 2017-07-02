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
import DateHistoriesHelper from '../helpers/DateHistoriesHelper';

export default class HomeScreen extends React.Component {

  state = {
      balance: 0,
      markedDates: {}
  }

  componentWillMount() {
    //FIXME: REMOVE BEFORE PUBLISHING
    //========= DEBUG ONLY ===========
    // global.storage.remove({ key: "balance" })
    // global.storage.remove({ key: "datehistories" });
    //================================
    // Add listener for balance update
    DeviceEventEmitter.addListener('updateBalance', (e)=>{
      console.log("BALANCE UPDATE CAUGHT!");
      this._retrieveBalance();
      this._getDatesWithHistory();
    });
    // Retrieve the balance from the local store
    this._retrieveBalance();
    this._getDatesWithHistory();
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

  _getDatesWithHistory(){
    global.dhHelper.getDatesWithHistory()
    .then(dates=>{
      this._formatmarkedDates(dates); // format the dates so that they're passed down to the calendar
    });
  }

  _formatmarkedDates(dates) {
    if (dates) {
      const mdSettings = {};
      dates.map((date)=>{
        const dateString = DateHistoriesHelper.getDateString(new Date(date));
        mdSettings[dateString] = {marked: true};
      });
      console.log("mdSettings: " + JSON.stringify(mdSettings));
      this.setState({ markedDates: mdSettings });
    }
  }

  static navigationOptions = ({navigation})=>{
    const buttons = <TransactionButtons navigation={navigation}/>
    return {
      title: global.APPNAME,
      headerRight: buttons
    };
  };

  render() {
    console.log("Dates in HS render: " + JSON.stringify(this.state.markedDates));
    return (
      <View style={styles.container}>
        <MoneyText style={styles.balance} amount={this.state.balance} />
        <PriceCalendar
          navigation={this.props.navigation}
          style={styles.calendar}
          markedDates={this.state.markedDates}/>
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
