import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  DeviceEventEmitter
} from 'react-native';
import Button from 'react-native-button';

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
    global.storage.load({
      key: 'balance'
    }).then(ret=>{
      this._updateBalance(ret);
    }).catch(err=>{
      console.warn(err.message);
      // Return 0 for the retrieved balance
      this._updateBalance(0);
    });
  }

  _updateBalance(newBalance){
    let balance = newBalance;
    const { goBack } = this.props.navigation;

    // Do the calculation for account balance.
    const amountVector = this.state.mode == 0 ? (0 - this.state.amount) : this.state.amount;
    balance = balance + amountVector;
    console.log("Balance is " + balance);

    // Save the balance
    global.storage.save({
      key: 'balance',
      data: Number(balance),
      expires: null
    }).then(ret=>{
      // Add the transaction to this date
      this._addTransactionToDate(amountVector);
      DeviceEventEmitter.emit('updateBalance', {});
      goBack();
    }).catch(err=> {
      console.warn(err.name);
      console.warn(err.message);
    });
  }

  _addTransactionToDate(amountVector){
    // Determine the date
    let date = new Date(); // default is today
    const passedInDate = this.props.navigation.state.params.date;
    if (typeof passedInDate != 'undefined'){
      date = passedInDate;
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
        <TextInput
          style={styles.amount}
          placeholder="0"
          autoFocus={true}
          keyboardType='numeric'
          editable={true}
          returnKeyType='done'
          onChangeText={(text)=> this.setState({amount: Number(text)})}
        />
        <TextInput
          style={styles.note}
          placeholder="Write a note."
          editable={true}
          multiline={true}
          autoCapitalize='sentences'
          onChangeText={(text)=> this.setState({note: text})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: 'black',
    marginTop: 10,
  },
  amount: {
    height: 15,
    fontSize: 35,
    flexDirection: "row",
    justifyContent: "center",
    color: "white",
    alignItems: "center"
  },
  note: {
    height: 50,
    fontSize: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    color: "white"
  },
  doneButton: {

  }
});
