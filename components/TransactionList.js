import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert,
  Button,
  TouchableHighlight,
  DeviceEventEmitter
} from 'react-native';
import MoneyText from '../components/MoneyText';
import DateHistoriesHelper from '../helpers/DateHistoriesHelper';

class ListItem extends React.PureComponent {
  _onPress = () => {
    console.log("On press - item");
    this.props.onPressItem(this.props.item);
  };

  render() {
    return (
      <TouchableHighlight {...this.props} onPress={this._onPress}>
        <View>
          <MoneyText style={styles.amount} amount={this.props.item.amount} />
          <Text style={styles.note}>{this.props.item.note}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class TransactionList extends React.PureComponent {

  state = {
    deleted: (new Map: Map<string, boolean>)
  };

  componentDidMount(){
    DeviceEventEmitter.addListener("addedTransactionToDate", (e)=>{
      this._refreshList();
    });
  }

  _refreshList(){
    this.setState({
      deleted: (new Map: Map<string, boolean>)
    });
  }

  // Gets the key from the transaction.
  _keyExtractor = (item, index) => item.id;

  _onPressItem = (item)=>{
    console.log("onPress - list");
    const day = this.props.navigation.state.params.day;
    const dateString = DateHistoriesHelper.getStandardizedDateString(day.dateString);
    // Prompt for delete item.
    Alert.alert("Delete?", `${item.amount} - ${item.note}`,
    [
      {
        text: 'Cancel',
        onPress: ()=> {}
      },
      {
        text: 'Delete',
        onPress: ()=> {
          global.dhHelper.removeTransaction(dateString, item.id);
          this.setState((state)=>{
            const deleted = new Map(state.deleted);
            deleted.set(item.id, true);
            return {deleted};
          });
        }
      }
    ]);
  }

  _renderItem = ({item})=>{
      if (!this.state.deleted.get(item.id) && !this.state.shouldUpdate) {
        return (
          <ListItem
            id={item.id}
            item={item}
            style={styles.tContainer}
            onPressItem={this._onPressItem}
            title={item.note}/>
        );
      }
  };

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
