import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import MoneyText from '../components/MoneyText';
import TransactionList from '../components/TransactionList';
import DateHistoriesHelper from '../helpers/DateHistoriesHelper';

export default class DayHistoryScreen extends React.Component {

  state: {
    day: "",
    transactions: []
  }

  componentWillMount(){
    const day = this.props.navigation.state.params.day;
    if (day){
      const dateString = DateHistoriesHelper.getStandardizedDateString(day.dateString);
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
      <View style={styles.container}>
        <TransactionList navigation={this.props.navigation} transactions={this.state.transactions} />
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
