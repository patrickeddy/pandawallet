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

export default class AnalyzeScreen extends React.Component{

  state = {
    data:[
      {x: "Sun", y: 200},
      {x: "Mon", y: 200},
      {x: "Tues", y: 5000},
      {x: "Wed", y: 4000},
      {x: "Thurs", y: 200},
      {x: "Fri", y: 200},
      {x: "Sat", y: 200}
    ]
  };

  componentWillMount(){
    this.setState({
      spendingData: DateHistoriesHelper.getSpendingData()
    });
  }

  static navigationOptions = {
    title: "Analyze"
  };

  render(){
    return (
      <View>
        <VictoryChart>
          <VictoryBar
          data={this.state.data}
          colorScale="qualitative"
          />
        </VictoryChart>
      </View>
    );
  }
}
