import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import Button from 'react-native-button';

const Mode = {
  SUBTRACT: 0,
  ADD: 1
};

export default class TransactionScreen extends React.Component {

  state = {
    amount: 0,
    note: ""
  };

  componentWillReceiveProps() {
    this.props.navigation.setParams({
      title: this.props.mode === Mode.SUBTRACT ? "-" : "+"
    });
  }

  static navigationOptions = ({navigation}) => {
    const { navigate } = navigation;
    const doneButton = (
      <Button
        style={styles.doneButton}
        onPress={()=> navigation.goBack()}
      >Done</Button>
    );

    return {
      title: navigation.state.params.title,
      headerRight: doneButton
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.amount}
          placeholder="0"
          keyboardType='numeric'
          editable={true}
          returnKeyType='done'
          onChangeText={(text)=> this.setState({amount: parseInt(text)})}
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
    flex: 5,
    fontSize: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    color: "white"
  },
  doneButton: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});
