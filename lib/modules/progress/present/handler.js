const moment = require('moment');

const HANDLED_TOPIC = 'progress-presentation';

module.exports = function handler(topic, action) {
  if (topic.includes(HANDLED_TOPIC)) {
    exec(action);
    return true;
  }
  return false;
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
