import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';

export default class TransactionButtons extends React.PureComponent{
  render(){
    const nav = this.props.navigation.state.params;
    const b1Params = { mode: 1 };
    const b2Params = { mode: 0 };
    if (nav){
      b1Params.date = nav.date;
      b2Params.date = nav.date;
    }

    return (
      <View style={styles.transactionButtons}>
        <Button
          onPress={() => this.props.navigation.navigate('Transaction', b1Params)}
          containerStyle={styles.tButtonContainer}
          style={styles.tButton}
        >+</Button>
        <Button
          onPress={() => this.props.navigation.navigate('Transaction', b2Params)}
          containerStyle={styles.tButtonContainer}
          style={styles.tButton}
        >-</Button>
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
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    margin: 10,
    backgroundColor: 'black',
    borderRadius: 35
  },
  tButton: {
    color: 'white',
    borderRadius: 100,
    fontSize: 20
  }
});
