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
      const dateString = DateHistoriesHelper.getDateString(new Date(day.dateString));
      this._getTransactions(dateString);
    }
  }

  _addTransactionCallback(){
    this._getTransactions(this.state.date);
  }

  _getTransactions(dateString){
    console.log("datestring after add: " + dateString);
    this.setState({
      date: dateString,
      transactions: global.dhHelper.getTransactions(dateString)
    });
  }

  _deleteItem(item){
    this._getTransactions(this.state.date);
  }

  _getDayTotal(){
    let total = 0;
    this.state.transactions.map((t)=> total += t.amount);
    return total;
  }

  static navigationOptions = ({navigation}) => {
    const day = navigation.state.params.day;
    const dateString = DateHistoriesHelper.getDateString(new Date(day.dateString));
    return {
      title: dateString,
    };
  };

  render(){
    console.log("Transactions: " + this.state.transactions);
    return (
      <View style={styles.container}>
        <View style={styles.totalContainer}>
          <MoneyText style={styles.total} amount={this._getDayTotal()} />
        </View>
        <View style={styles.listContainer}>
          <TransactionList
              navigation={this.props.navigation}
              transactions={this.state.transactions}
              deleteItemCallback={this._deleteItem.bind(this)}/>
        </View>
        <View style={styles.buttonsContainer}>
          <TransactionButtons
            navigation={this.props.navigation}
            date={this.state.date}
            callback={this._addTransactionCallback.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: 'black',
  },
  totalContainer:{
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "dimgray",
    backgroundColor: "white"
  },
  total: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold"
  },
  listContainer: {
    flex: 6,
    alignItems: "stretch",
  },
  buttonsContainer:{
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(200,200,200,0.2)"
  }
});
