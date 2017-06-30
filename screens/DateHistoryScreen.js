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
    const day = this.props.navigation.state.params.day;
    const dateString = new Date(day.dateString).toDateString();
    if (day){
      this.setState({
        date: dateString,
        transactions: global.dhHelper.getTransactions(dateString)
      });
    }
  }

  static navigationOptions = ({navigation}) => {
    const day = navigation.state.params.day.dateString;
    return {
      title: day
    };
  };

  render(){
    console.log("Transactions: " + this.state.transactions);
    return (
      <View>
        {this.state.transactions.map((transaction)=>{
          return <Text key={transaction.id}>Amount: {transaction.amount} Note: {transaction.note}</Text>
        })}
      </View>
    );
  }
}
