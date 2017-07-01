import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  DeviceEventEmitter
} from 'react-native';
import Button from 'react-native-button';
import BalanceHelper from '../helpers/BalanceHelper.js';

const Mode = ['-', '+'];

export default class TransactionScreen extends React.Component {

  state = {
    mode: this.props.navigation.state.params.mode,
    amount: 0,
    note: "",
  };

  _doneButtonPress(){
    // Add or subtract the amount based on the current transaction node from the total balance.
    console.log(`State amount ${this.state.amount} and note is: ${this.state.note}`);

    // First get the balance from local store.
    this._updateBalance();
  }

  _updateBalance(){
    const { goBack } = this.props.navigation;
    // Calculation the amount
    const amountVector = this.state.mode == 0 ? (0 - this.state.amount) : this.state.amount;
    // Add the amount to the balance
    BalanceHelper.add(amountVector)
    .then(ret=>{
      // Add the transaction to this date
      this._addTransactionToDate(amountVector);
      DeviceEventEmitter.emit('updateBalance', {});
      goBack();
    }).catch(err=>{
      console.warn(err.name);
      console.warn(err.message);
    });
  }

  _addTransactionToDate(amountVector){
    // Determine the date
    let date = new Date(); // default is today
    const passedInDate = this.props.navigation.state.params.date;
    if (typeof passedInDate != 'undefined'){
      date = global.dhHelper.getStandardizedDateString(passedInDate.dateString);
    }
    console.log("Executing...");
    console.log("Date before add transaction is: " + date.toDateString());
    // Add this transaction to the current date
    global.dhHelper.addTransaction(date.toDateString(), {amount: amountVector, note: this.state.note});
    console.log("Added transaction");
  }

  componentWillMount() {
    const doneButton = (
      <Button
        style={styles.doneButton}
        containerStyle={styles.doneButtonContainer}
        onPress={()=> this._doneButtonPress()}
      >Done</Button>
    );

    this.props.navigation.setParams({
      doneButton: doneButton
    });
  }

  static navigationOptions = ({navigation}) => {
    const { navigate } = navigation;

    return {
      title: Mode[navigation.state.params.mode],
      headerRight: navigation.state.params.doneButton
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.amountContainer}>
          <TextInput
            style={styles.amount}
            placeholder="0"
            autoFocus={true}
            keyboardType='numeric'
            editable={true}
            returnKeyType='done'
            onChangeText={(text)=> this.setState({amount: Number(text)})}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
        </View>
        <View style={styles.noteContainer}>
          <TextInput
            style={styles.note}
            placeholder="Eggs, gas, paycheck, etc."
            editable={true}
            multiline={true}
            autoCapitalize='sentences'
            onChangeText={(text)=> this.setState({note: text})}
            underlineColorAndroid='rgba(0,0,0,0)'
            clearButtonMode='while-editing'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'black',
    padding: 15
  },
  amountContainer: {
    flex: 2,
  },
  amount: {
    textAlign: "center",
    fontSize: 40,
    color: "white",
    width: 350
  },
  noteContainer: {
    flex: 8,
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  note: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    width: 350,
    height: 200,
    textAlignVertical: 'top',
    borderTopWidth: 1,
    borderColor: "dimgray"
  },
  doneButton: {

  }
});
