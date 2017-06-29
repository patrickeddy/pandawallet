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


class Transaction{
  constructor(id, amount, note){
    this.id = id;
    this.amount = amount;
    this.note = note;
  }
}

class DateHistory{

  transactions = [];

  constructor(/* String */ date, /* Array[Transaction] */ transactions){
    this.date = date;
    this.transactions = transactions;
  }

  // Returns the transactions
  get transactions() {
    return this.transactions;
  }

  // Adds the transaction to this day
  addTransaction(/* Transaction */ transaction) {
    console.log("Creating transaction...");
    const t = new Transaction(this.transactions.length, transaction.amount, transaction.note);
    console.log("Created transaction...");
    this.transactions.push(t);
    console.log("Added transaction");
  }

  // Removes the transaction from this day
  removeTransaction(/* Int */ id) {
    const t = new Transaction(this.transactions.length, amount, note);
    this.transactions.remove(t);
  }
}

export default class DateHistoriesHelper{

  histories = {};

  constructor() {
    // Load or create
    global.storage.load({
      key: 'datehistories'
    }).then(ret=>{
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
    const day = this.histories[date];
    if (day){
      return day.transactions;
    } else {
      return [];
    }
  }

  // Adds the transaction
  addTransaction(/* String */ date, /* Transaction */ transaction){
    // Get our day in question.
    const day = this.histories[date];
    let ts = [];
    // Get the existing transactions
    if (day.transactions && day.transactions.length > 0) ts = day.transactions;
    // Create the object
    const dh = new DateHistory(date, [ts]);
    // Add the new transaction
    dh.addTransaction(transaction);
  }

  // Removes the transaction
  removeTransaction(/* String */date, /* Int */ id){
    let day = this.histories[date];
    if (day) {
      day.removeTransaction(id);
      this._save();
    }
  }
}
