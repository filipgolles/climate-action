const classify = require('../classifier/classify');
const { weather, register, present, food } = require('../modules');
const { main, permission, fallback } = require('./standard-intents');

module.exports = async action => {
  switch (action.getIntent()) {
  case 'actions.intent.MAIN':
    main(action);
    break;

  case 'actions.intent.PERMISSION':
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
  const input = await classify(action.getRawInput());

  switch (input.topic) {
  case 'weather':
    weather(action, input);
    break;

  case 'register':
    register(action, input);
    break;

  case 'present':
    present(action, input);
    break;

  case 'food':
    food(action, input);
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
