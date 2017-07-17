import React from 'react';
import {
  View,
  Text
} from 'react-native';
import Button from 'react-native-button';
import {
  VictoryChart,
  VictoryBar
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
    averageSpendingData: ()=> [],
  };

  componentWillMount(){
    // Set the state for the charts
    global.dhHelper.getSpendingData().then((spendingData)=>{
      this.setState({
        averageSpendingData: ()=>{
          console.log("Called!");
          const as = spendingData.averageSpending; // get the averageSpending data
          const asChartData = []; // format the data for the bar chart
          for (let i = 0; i < as.length; i++){
            asChartData.push({x: WEEKDAY_NAMES[i], y: as[i]}); //
          }
          return asChartData;
        },
      });
    }).catch((err)=> console.log(err));
  }

  static navigationOptions = {
    title: "Analyze"
  };

  render(){
    return (
      <View>
        <VictoryChart>
          <VictoryBar
          data={this.state.averageSpendingData()}
          colorScale="qualitative"
          />
        </VictoryChart>
      </View>
    );
  }
}
