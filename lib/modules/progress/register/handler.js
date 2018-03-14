const moment = require('moment');

const HANDLED_TOPIC = 'register';

module.exports = async (topic, action) => {
  if (topic === HANDLED_TOPIC) {
    // exec(action);
    return true;
  }
  return false;
};

// write behaviors
function exec(action) {
  const week = moment().week();
  if (!action.userStorage.registered) {
    action.userStorage.registered = { [week]: []};
  } else if (!action.userStorage.registered[week]) {
    action.userStorage.registered[week] = [];
  }
  action.userStorage.registered[week].push(action.getRawInput());
  console.log(action.userStorage.registered);
  action.tell('One point to you!');
}
