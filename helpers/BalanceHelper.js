import {
  DeviceEventEmitter
} from 'react-native';

export default class BalanceHelper{
  // Gets the balance from local store or creates it.
  static get(){
    return new Promise((res, rej)=>{
      global.storage.load({
        key: 'balance'
      }).then(ret=>res(ret)) // return the balance if found
      .catch(err=>{
        rej(err);
        if (err.name == "NotFoundError") {
          // CREATE THE BALANCE OBJECT
          global.storage.save({
            key: 'balance',
            data: Number(0)
          }).then(ret=>console.log("Created balance entry in storage."))
          .catch(err=>console.log(err.message));
        }
      });
    });
  }

  // Adds the amountVector (+ or -) to the balance.
  static add(amountVector){
    return new Promise((res, rej)=>{
      global.storage.load({
        key: 'balance'
      }).then(ret=>{
        let balance = ret + amountVector; // add the amount vector to the retrieved balance
        balance = (balance * 100) / 100; // round to 2 decimals
        global.storage.save({ // save the balance
          key: 'balance',
          data: Number(balance),
          expires: null
        }).then(ret=>{
          res(ret); // return the balance
          DeviceEventEmitter.emit('updateBalance', {});
        }).catch(err=> rej(err));
      }).catch(err=> rej(err));
    });
  }
}
