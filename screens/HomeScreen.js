import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
import PriceCalendar from '../components/PriceCalendar';

export default class HomeScreen extends React.Component {

  state = {
      balance: 0
  }

  componentWillMount() {
    // Retrieve the balance from the local store
    storage.load({
      key: 'balance'
    }).then(ret=>{
      // Set the state balance
      this.setState({balance: ret});
    }).catch(err=>{
      console.warn(err.message);
    });
  }

  static navigationOptions = ({navigation})=>{
    // Setup the button
    const rbs = (
      <View style={styles.transactionButtons}>
        <View style={styles.addButton}>
          <Button onPress={() => navigation.navigate('Transaction')} title="+"/>
        </View>
      </View>
    );
    return {
      title: "No Money",
      headerRight: rbs
    }
  };
  render() {
    return (
      <View>
        <Text>{this.state.balance}</Text>
        <PriceCalendar navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  transactionButtons: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  balance: {
    fontWeight: "bold",
    fontSize: 20,
  },
  addButton: {
    marginLeft: 10,
    borderRadius: 25
  },
  subtractButton: {
    margin: 10,
    padding: 50,
  }
});
