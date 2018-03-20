const { classify, extractArgs } = require('../classifier/classify');
const { weather, register, present, food } = require('../modules');
const { main, permission, fallback } = require('./standard-intents');

module.exports = async action => {
  switch (action.getIntent()) {
  case 'actions.intent.MAIN':
    return main(action);

  case 'actions.intent.PERMISSION':
    return permission(action);

  case 'actions.intent.TEXT':
    return toHandlers(action);

  default:
    return fallback(action);
  }
};

async function toHandlers(action) {
  const classified = await classify(action.getRawInput());

  switch (classified) {
  case 'weather':
    weather(action);
    break;

  case 'register':
    register(action, extractArgs(action.getRawInput()));
    break;

  case 'present':
    present(action);
    break;

  case 'food':
    food(action, extractArgs(action.getRawInput()));
    break;

  case 'reset':
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
