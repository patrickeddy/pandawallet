import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert,
  Button
} from 'react-native';
import MoneyText from '../components/MoneyText';
import DateHistoriesHelper from '../helpers/DateHistoriesHelper';

class ListItem extends React.PureComponent {
  _onPress = () => {
    console.log("On press - item");
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <View {...this.props}>
        <MoneyText style={styles.amount} amount={this.props.item.amount} />
        <Text style={styles.note}>{this.props.item.note}</Text>
        <Button title="Delete" onPress={this._onPress} />
      </View>
    );
  }
}

export default class TransactionList extends React.PureComponent {
  // Gets the key from the transaction.
  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: number)=>{
    console.log("onPress - list");
    const day = this.props.navigation.state.params.day;
    const dateString = DateHistoriesHelper.getStandardizedDateString(day.dateString);
    // Prompt for delete item.
    Alert.alert("Delete?", "",
    [
      {
        text: 'Cancel',
        onPress: ()=> {}
      },
      {
        text: 'Delete',
        onPress: ()=> {
          // global.dhHelper.removeTransaction(dateString, id)
        }
      }
    ]);
  }

  _renderItem = ({item})=>(
      <ListItem
        id={item.id}
        item={item}
        style={styles.tContainer}
        onPressItem={this._onPressItem}
        title={item.note}/>
  );

  render() {
    return (
      <FlatList
        data={this.props.transactions}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  tContainer: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  amount: {
    fontSize: 30,
    color: 'white',
  },
  note: {
    fontSize: 18,
    color: 'white',
  },
});
