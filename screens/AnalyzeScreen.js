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
    largePurchases: [{x: "Cheese", y: 5000}, {x: "Bacon", y: 100}],
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
    title: "Analyze",
  };

  render(){
    if (!this.state.loading) {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Average Spending Per Weekday</Text>
          <VictoryChart>
            <VictoryBar
            data={this.state.averages}
            colorScale="qualitative"
            />
          </VictoryChart>
          <Text style={styles.header}>Largest Purchases Last Month</Text>
          <VictoryPie
            data={this.state.largePurchases}
            colorScale="qualitative"
          />
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
    padding: 10,
  },
});
