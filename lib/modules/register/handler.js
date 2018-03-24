const moment = require('moment');

module.exports = async (action, args) => {
  console.log(`handled by register. args: ${ await args }`);
  action.ask('registering...');
};

module.exports.cheat = async (action, args) => {};

// write behaviors

// function exec(action) {
//   const week = moment().week();
//   if (!action.userStorage.registered) {
//     action.userStorage.registered = { [week]: []};
//   } else if (!action.userStorage.registered[week]) {
//     action.userStorage.registered[week] = [];
//   }
//   action.userStorage.registered[week].push(action.getRawInput());
//   console.log(action.userStorage.registered);
//   action.tell('One point to you!');
// }
