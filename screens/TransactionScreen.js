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

    const { mode, amount, note } = this.state;
    const { goBack } = this.props.navigation;
    const { updateBalance } = this.props.navigation.state.params;

    // First get the balance from local store.
    storage.load({
      key: 'balance'
    }).then(ret=>{
      let balance = ret;
      // Do the calculation for account balance.
      balance = this.state.mode == 0 ? balance - this.state.amount : balance + this.state.amount;
      //======
      //TODO: Save the date object to a master date object.
      //======
      // Save the objects
      storage.save({
        key: 'balance',
        data: balance
      }).then(ret=>{
        // Call the updateBalance callback method and then navigate back
        DeviceEventEmitter.emit('updateBalance', {});
        console.log("Balance update emitted");
        goBack();
      }).catch(err=>{
        console.warn(err.message);
      });
    }).catch(err=>{
      console.warn(err.message);
    });
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
    backgroundColor: 'black'
  },
  amount: {
    flex: 2,
    fontSize: 35,
    flexDirection: "row",
    justifyContent: "center",
    color: "white",
    alignItems: "center"
  },
  note: {
    flex: 8,
    fontSize: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    color: "white"
  },
  doneButton: {

  }
});
