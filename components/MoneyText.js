import React from 'react';
import {
  Text
} from 'react-native';

export default class MoneyText extends React.Component {
  render(){
    const amountString = String(this.props.amount);
    const formattedString = numberWithCommas(amountString);
    return(
      <Text style={this.props.style}>{formattedString}</Text>
    );
  }
}

const numberWithCommas = (x)=>{
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};
