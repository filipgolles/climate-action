const { classify, extractArgs } = require('../classifier/classify');
const { weather, register, present, food } = require('../modules');
const { main, permission, fallback } = require('./standard-intents');

module.exports = async action => {
  switch (action.getIntent()) {
  case 'actions.intent.MAIN':
    console.log('dispatch standard-MAIN');
    main(action);
    break;
  case 'actions.intent.PERMISSION':
    console.log('dispatch standard-PERMISSION');
    permission(action);
    break;
  case 'actions.intent.TEXT':
    toHandlers(action);
    break;
  default:
    fallback(action);
    break;
  }
};

async function toHandlers(action) {
  switch (await classify(action.getRawInput())) {
  case 'weather':
    console.log('dispatch weather job');
    weather(action);
    break;
  case 'register':
    console.log('dispatch register job');
    register(action, extractArgs(action.getRawInput()));
    break;
  case 'present':
    console.log('dispatch present job');
    present(action);
    break;
  case 'food':
    console.log('dispatch food job');
    food(action, extractArgs(action.getRawInput()));
    break;
    // reset is just for devving and that
  case 'reset':
    console.log('resetting data');
    reset(action);
    break;
  default:
    fallback(action);
    break;
  }
}

// dev dev dev devving
async function reset(action) {
  console.log(action.userStorage);
  delete action.userStorage.location; // eslint-disable-line
  delete action.userStorage.registered; // eslint-disable-line
  console.log(action.userStorage);
  action.tell('Removed all emotions');
}
