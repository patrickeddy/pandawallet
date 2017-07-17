import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from 'react-native';
import Button from 'react-native-button';
import BalanceHelper from '../helpers/BalanceHelper';
import DateHistoriesHelper from '../helpers/DateHistoriesHelper';

const Mode = ['-', '+'];

export default class TransactionScreen extends React.Component {

  state = {
    mode: this.props.navigation.state.params.mode,
    amount: 0,
    note: "",
    saving: false
  };

  _doneButtonPress(){
    this.setState({
      saving: true
    });
    // Add or subtract the amount based on the current transaction node from the total balance.
    console.log(`State amount ${this.state.amount} and note is: ${this.state.note}`);

    // First get the balance from local store.
    this._updateBalance();
  }

  _updateBalance(){
    const { goBack } = this.props.navigation;
    const { callback } = this.props.navigation.state.params;
    console.log("State params on transaction add: " + JSON.stringify(this.props.navigation.state.params));
    // Calculation the amount
    const amountVector = this.state.mode == 0 ? (0 - this.state.amount) : this.state.amount;
    // Add the amount to the balance
    BalanceHelper.add(amountVector)
    .then(ret=>{
      // Add the transaction to this date
      this._addTransactionToDate(amountVector);
      if (callback) callback();
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
    console.log("passindate: " + passedInDate);
    if (passedInDate && typeof passedInDate != 'undefined'){
      console.log("Date passed : " + passedInDate);
      date = new Date(passedInDate);
    }
    console.log("Executing...");
    console.log("Date before add transaction is: " + DateHistoriesHelper.getDateString(date));
    // Add this transaction to the current date
    global.dhHelper.addTransaction(DateHistoriesHelper.getDateString(date), {amount: amountVector, note: this.state.note});
    console.log("Added transaction");
  }

  componentWillMount() {
    const doneButton = (
      <Button
        style={styles.doneButton}
        containerStyle={styles.doneButtonContainer}
        onPress={()=> this._doneButtonPress()}
      >Add</Button>
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

  _scrubNumber(num){
    return Number(num.replace(/[^\d.-]/g, ''));
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.amountContainer}>
          <TextInput
            style={styles.amount}
            placeholder={"0"}
            placeholderTextColor={"lightgray"}
            autoFocus={true}
            keyboardType={'numeric'}
            editable={true}
            returnKeyType={'next'}
            onChangeText={(text)=> this.setState({amount: this._scrubNumber(text)})}
            onEndEditing={(even)=> this.refs.note.focus()}
            underlineColorAndroid={'rgba(0,0,0,0)'}
          />
        </View>
        <View style={styles.noteContainer}>
          <TextInput
            ref="note"
            style={styles.note}
            placeholder={"Write a note."}
            placeholderTextColor={"lightgray"}
            editable={true}
            autoCapitalize={'sentences'}
            returnKeyType={'go'}
            onChangeText={(text)=> this.setState({note: text})}
            onSubmitEditing={()=> this._doneButtonPress()}
            underlineColorAndroid='rgba(0,0,0,0)'
            clearButtonMode='while-editing'
          />
        </View>
        <View style={styles.savingContainer}>
          <ActivityIndicator
            size='large'
            animating={this.state.saving}
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
    backgroundColor: "rgba(150, 150, 150, 0.5)",
    margin: 10,
  },
  amount: {
    textAlign: "center",
    fontSize: 40,
    color: "white",
    width: 300,
    height: 60,
  },
  noteContainer: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "rgba(150, 150, 150, 0.5)",
    margin: 10,
  },
  note: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    width: 300,
    height: 50,
    textAlignVertical: 'top',
  },
  doneButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
  doneButtonContainer: {
    padding: 15
  },
  savingContainer:{
    marginTop: 25,
    position: "absolute"
  },
});
