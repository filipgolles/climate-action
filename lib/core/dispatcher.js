const { weather, register, present, food } = require('../modules');

module.exports = (action, input) => {
  switch (input.topic) {
  case 'weather':
    weather(action, input.args);
    break;
  case 'register':
    register(action, input.args);
    break;
  case 'present':
    present(action, input.args);
    break;
  case 'food':
    food(action, input.args);
    break;
  case 'reset':
    reset(action, input.args);
    break;
  default:
    throw new Error('Could not match input');
  }
};

// dev dev dev devving
async function reset (action) {
  console.log(action.userStorage);
  delete action.userStorage.location;
  delete action.userStorage.registered;
  console.log(action.userStorage);
  action.tell('Removed all emotions');
}
