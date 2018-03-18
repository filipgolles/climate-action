const moment = require('moment');

module.exports = async action => {
  console.log(`handled by present`);
};

// read behaviors
function exec(action) {
  const week = moment().week();
  if (!action.userStorage.registered) {
    // done nothing ever
  } else if (!action.userStorage.registered[week]) {
    // done nothing this week
  } else if (!action.userStorage.registered[week - 1]) {
    // dont this week, but not last
  } else {
    // done both this and last week
    const diff =
      action.userStorage.registered[week].length -
      action.userStorage.registered[week - 1].length;

    diff > 0
      ? action.tell('You are doing better than last week!')
      : action.tell('Not quite as good as last week.');
  }
}
