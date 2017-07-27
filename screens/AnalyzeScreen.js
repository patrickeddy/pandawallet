import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';
import {
  VictoryChart,
  VictoryBar,
  VictoryPie
}from 'victory-native';
import DateHistoriesHelper from '../helpers/DateHistoriesHelper';

const WEEKDAY_NAMES = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat"
]

export default class AnalyzeScreen extends React.Component{

  state = {
    loading: true,
    averages: [{x: 0, y: 0}],
    largePurchases: [{date: "2017-7-17", note: "Cheese", amount: -5000}, {date: "2017-7-17", note: "Bacon", amount: -100}],
  };

  componentDidMount(){
    // Set the state for the charts
    global.dhHelper.getSpendingData().then((spendingData)=>{
      const as = spendingData.averages; // get the averageSpending data
      console.log(spendingData.averages);
      const asChartData = []; // format the data for the bar chart
      for (let i = 0; i < as.length; i++){
        const bar = {x: WEEKDAY_NAMES[i], y: -(as[i])};
        console.log(bar);
        asChartData.push(bar); // set the x and y to the weekday names, and the average value
      }

      this.setState({
        loading: false,
        averages: asChartData,
      });
    }).catch((err)=> console.log(err));
  }

  static navigationOptions = {
    title: "📊",
  };

  // Navigates to the date history screen for the large purchases
  _goToDateHistoryScreen(date){
    console.log("before go to datescreen: " + date);
    const nav = this.props.navigation;
    this.props.navigation.navigate('DateHistory', {day: {dateString: date}});
  }

  render(){
    if (!this.state.loading) {
      // <Text style={styles.header}>Largest Purchases Last Month</Text>
      // <View style={styles.list}>
      //   {this.state.largePurchases.map((item, key)=>{
      //     return <Button
      //             key={key}
      //             style={styles.dateButton}
      //             onPress={()=>this._goToDateHistoryScreen(item.date)}>
      //             {item.note} ({item.amount})
      //             </Button>;
      //   })}
      // </View>
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Average Weekday Spending</Text>
          <VictoryChart
            padding={75}>
            <VictoryBar
            data={this.state.averages}
            colorScale="qualitative"
            />
          </VictoryChart>
        </ScrollView>
      );
    } else {
      return (<Text>Loading....</Text>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  header:{
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  listItem: {
    justifyContent: "flex-start",
    fontSize: 20,
    padding: 15,
  },
  dateButton: {
    color: "blue",
    fontSize: 20,
  },
});
