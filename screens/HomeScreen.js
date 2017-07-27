import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  DeviceEventEmitter,
  ActivityIndicator
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
      markedDates: {},
      fetching: true
  }

  componentWillMount() {
    // // Add listener for balance update
    DeviceEventEmitter.addListener('updateBalance', (e)=>{
      console.log("BALANCE UPDATE CAUGHT!");
      this._getData();
    });
    // Get the data
    this._getData();
  }

  _getData(){
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
    }).catch(err=>{
      console.warn(err.message);
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
      this.setState({
        markedDates: mdSettings,
        fetching: false,
      });
    }
  }

  static navigationOptions = ({navigation})=>{
    const buttons = (
      <Button
        style={{marginRight: 10, padding: 10}}
        onPress={()=>navigation.navigate('Analyze', {})}
        >📊</Button>
    );
    return {
      title: global.APPNAME_EMOJI,
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
          <View style={styles.buttonsContainer}>
            <TransactionButtons
              navigation={this.props.navigation}
            />
          </View>
          <View style={styles.fetchingContainer}>
            <ActivityIndicator
              size='large'
              animating={this.state.fetching}
              />
          </View>
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
    fontSize: 42,
    backgroundColor: 'black',
    color: 'white'
  },
  calendar: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  buttonsContainer:{
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  fetchingContainer:{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
});
