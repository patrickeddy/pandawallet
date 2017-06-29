import React from 'react';
import {
  View,
  Text
} from 'react-native';

export default class DayHistoryScreen extends React.Component {

  state: {
    day: "",
    transactions: []
  }

  componentWillMount(){
    const day = navigation.state.params.day.dateString;
    this.setState({ date: day });

    this.state.transactions = global.dhHelper.getTransactions(this.state.day);
  }

  static navigationOptions = ({navigation}) => {
    const day = navigation.state.params.day.dateString;
    return {
      title: day
    };
  };

  render(){
    let list = null;
    for (let transaction in this.state.transactions){
      <Text>Amount: {transaction.amount} Note: {transaction.note}</Text>
    }
    return (
      list
    );
  }
}
