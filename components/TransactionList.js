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
    deleted: (new Map: Map<string, boolean>),
  };

  componentWillReceiveProps(nextProps){
    //TODO: Fix this so that it properly renders when there's a differenc, and not every time.
    this._refreshList();
  }

  _refreshList(){
    console.log("Refreshed state.deleted");
    this.setState((state)=>{
      const deleted = new Map(state.deleted);
      deleted.clear();
      return { deleted };
    });
  }

  // Gets the key from the transaction.
  _keyExtractor = (item, index) => item.id;

  _onPressItem = (item)=>{
    console.log("onPress - list");
    const day = this.props.navigation.state.params.day;
    const dateString = DateHistoriesHelper.getDateString(new Date(day.dateString));
    // Prompt for delete item.
    Alert.alert("💣...💥?", `${item.amount} - ${item.note}`,
    [
      {
        text: 'Cancel',
        onPress: ()=> {}
      },
      {
        text: 'Delete',
        onPress: ()=> {
          // Delete the item from local store
          global.dhHelper.removeTransaction(dateString, item.id);
          // Call the props callback onPressItem
          this.props.deleteItemCallback(item);
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
      if (!this.state.deleted.has(item.id)) {
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
