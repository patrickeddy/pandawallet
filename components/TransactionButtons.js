import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class TransactionButtons extends React.PureComponent{

  _handleButtonPress(params){
    this.props.navigation.navigate('Transaction', params);
  }

  render(){
    const date = this.props.date;
    const b1Params = { callback: this.props.callback};
    const b2Params = { callback: this.props.callback};

    b1Params.mode = 1;
    b2Params.mode = 0;

    if (date){
      b1Params.date = date;
      b2Params.date = date;
    }

    console.log(JSON.stringify(b1Params));
    console.log(JSON.stringify(b2Params));
    return (
      <View style={styles.transactionButtons}>
        <TouchableOpacity
          onPress={() => this._handleButtonPress(b1Params)}
          style={styles.tButtonContainer}>
        <Text style={styles.tButton}>+</Text>
      </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._handleButtonPress(b2Params)}
          style={styles.tButtonContainer}>
          <Text style={styles.tButton}>-</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  transactionButtons: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  tButtonContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    margin: 10,
    backgroundColor: 'black',
    borderRadius: 35,
  },
  tButton: {
      color: "white",
      fontSize: 28
  },
});
