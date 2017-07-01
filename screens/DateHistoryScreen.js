import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native';
import MoneyText from '../components/MoneyText';
import TransactionList from '../components/TransactionList';
import DateHistoriesHelper from '../helpers/DateHistoriesHelper';
import TransactionButtons from '../components/TransactionButtons';

export default class DayHistoryScreen extends React.Component {

  state: {
    date: "",
    transactions: [],
  }

  componentWillMount(){
    const day = this.props.navigation.state.params.day;
    if (day){
      const dateString = DateHistoriesHelper.getStandardizedDateString(day.dateString);
      this._getTransactions(dateString);
    }
  }

  _getTransactions(dateString){
    console.log("datestring after add: " + dateString);
    this.setState({
      date: dateString,
      transactions: global.dhHelper.getTransactions(dateString)
    });
  }

  static navigationOptions = ({navigation}) => {
    const day = navigation.state.params.day;
    const dateString = DateHistoriesHelper.getStandardizedDateString(day.dateString);

    const buttons = <TransactionButtons
                      navigation={navigation}
                      date={dateString}
                    />
    return {
      title: dateString,
      headerRight: buttons
    };
  };

  render(){
    console.log("Transactions: " + this.state.transactions);
    return (
      <View style={styles.container}>
        <TransactionList
            navigation={this.props.navigation}
            transactions={this.state.transactions}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "stretch",
    backgroundColor: 'black',
  },
});
