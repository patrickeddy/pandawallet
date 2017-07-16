/*
  Dates are stored in storage like:
  ````````````````
  datehistories: {
    'dateString': {
      transactions: Transaction[]
    }
  }
  ````````````````
  To retrieve the transaction history for day '2017-3-1':
  `datehistories['2017-3-1'].transactions`

  To access the 5th transaction for day '2017-3-1':
  `datehistories['2017-3-1'].transactions[4]`

  More examples
  `````````````
  const transaction = datehistories['2017-3-1'].transactions[4]

  transaction.id
  => 5

  transaction.amount
  => -200

  transaction.note
  => "Bottled water"
  `````````````
*/

import BalanceHelper from './BalanceHelper';

class Transaction{
  constructor(id, amount, note){
    this.id = id;
    this.amount = amount;
    this.note = note;
  }
}

class DateHistory{
  constructor(/* String */ date, /* Array[Transaction] */ transactions){
    this.date = date;
    this.transactions = transactions;
  }

  getTransaction(id){
    let trans = null;
    this.transactions.map((t)=>{
      if (t.id == id) trans = t;
    });
    return trans;
  }

  // Returns the transactions
  get getTransactions() {
    return this.transactions;
  }

  set setTransactions(transactions){
    this.transactions = transactions;
  }

  get numOfTransactions(){
    return this.transactions? this.transactions.length : 0;
  }

  // Adds the transaction to this day
  addTransactionToDate(/* Transaction */ transaction) {
    console.log("Creating transaction...");
    let id = 0;
    if (this.transactions){
      id = this.transactions[this.transactions.length-1].id +1; // set the id to one more than the previously created id.
    } else {
      this.transactions = [];
    }
    const t = new Transaction(id, transaction.amount, transaction.note);
    this.transactions.push(t);
    console.log("Added transaction");
  }

  // Removes the transaction from this day
  removeTransactionFromDate(/* Int */ id) {
    for (let i = 0; i < this.transactions.length; i++){
      const t = this.transactions[i];
      if (t.id == id) {
        this.transactions.splice(i, 1);
      }
    }
  }
}

export default class DateHistoriesHelper{

  // Formats dates YYYY-MM-DD.
  static getDateString(/* Date */date){
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month >= 10 ? month : "0" + month}-${day >= 10 ? day : "0" + day}`;
  }

  // Promise that gets the histories from storage.
  static getHistories(){
    return new Promise((res, rej)=>{
      global.storage.load({
        key: 'datehistories'
      }).then(ret=> res(ret))// Retrieve the datehistories from local store.
      .catch(err=>rej(err));
    });
  }

  // Gets the spending data and returns an object
  static getSpendingData(){
    /*
      Want:
        1. Average spending per weekday
        2. 10 largest purchases last month
        3.

      Strategy:
        average spending (bar chart):
            Get dates with histories, turning them into Date objects, calling getDay() to check the weekday, and then summing to the specific day value and the count of those days {amount: 100, count: 1}. Those amounts are then divided by their counts when turned into a final object like; {sun: 100, mon: 200, ..}
        large purchases (pie chart):
            Create an array of purchases by cycling through each transaction and adding to the array if it's larger (or rather, less than because -) than any items, sorting the array, and then deleting the last item if length > 10. Each item will take the form just like transactions: {day: "2017-5-3", note: "Pen", amount: 100}

    */
    return {

    };
  }

  constructor() {
    this.histories = {};
    // Load or create
    DateHistoriesHelper.getHistories()
    .then(ret=>{
      // Retrieve the datehistories from local store.
      this.histories = ret;
      console.log("DateHistories: " + JSON.stringify(ret));
    }).catch(err=>{
      console.log(err.message);
      // Is there no entry for date histories?
      if (err.name == "NotFoundError") {
        // Create an entry
        global.storage.save({
          key: 'datehistories',
          data: {}
        }).then(datehistories=>{
          console.log("datehistories entry created");
        }).catch(err=>{
          console.log(err.message);
        });
      }
    });
  }

  // Get the dates on the histories object.
  getDatesWithHistory(){
    return new Promise((res, rej)=>{
      let keys = [];
      DateHistoriesHelper.getHistories()
      .then(ret=>res(Object.keys(ret))) // return the keys from the histories
      .catch((err)=> rej(err));
    });
  }

  // Saves the histories array to local storage.
  _save(){
    console.log(JSON.stringify(this.histories));
    global.storage.save({
      key: 'datehistories',
      data: this.histories
    }).then(ret=>{
      console.log("DateHistories saved.");
    }).catch(err=>{
      console.log(err.message);
    });
  }

  // Gets the transactions for a specified date
  getTransactions(/* String */ date){
    console.log("TRANSACTION SCREEN");
    console.log("Date is: " + date);
    if (this.histories && this.histories[date]){
      console.log("Transactions received.");
      return this.histories[date].transactions;
    } else {
      console.log("No transactions.");
      return [];
    }
  }

  _getDHWithTransactionsForDate(date){
    const day = new DateHistory(date);
    const recordedDay = this.histories[date];
    // Get the existing transactions
    if (recordedDay && recordedDay.transactions && recordedDay.transactions.length > 0){
      day.setTransactions = recordedDay.transactions;
    }
    return day;
  }

  // Adds the transaction
  addTransaction(/* String */ date, /* Transaction */ transaction){
    console.log("datestring is: " + date);
    // Get our day in question.
    const day = this._getDHWithTransactionsForDate(date);
    console.log("Adding transaction to date...");
    day.addTransactionToDate(transaction);
    // Set the history for this day.
    this.histories[date] = day;
    this._save();
  }

  // Removes the transaction
  removeTransaction(/* String */date, /* Int */ id){
    const day = this._getDHWithTransactionsForDate(date);
    const transaction = day.getTransaction(id); // remove the transaction amount from balance
    BalanceHelper.add(0 - transaction.amount);

    day.removeTransactionFromDate(id); // remove the transaction from the date
    if (day.numOfTransactions == 0){
      delete this.histories[date]; // delete the entry if there are no transactions on this date
    } else {
      this.histories[date] = day; // save the new date history transactions
    }
    this._save();
  }
}
