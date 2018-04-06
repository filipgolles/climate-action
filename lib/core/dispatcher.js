const classify = require('../../nlp/classify');
const { weather, register, present, food } = require('../modules');

module.exports.main = action => {
  // making sure all storage props exist
  if (!action.userStorage.location) {
    action.userStorage.location = null;
  }

  if (!action.userStorage.prog) {
    action.userStorage.prog = {};
  }

  // new users should get some kind of tutorial
  if (action.getUser().lastSeen) {
    action.ask('Hello again!');
  } else {
    action.ask('Hey, new user! Welcome!');
  }
};

module.exports.permission = action => {
  if (action.isPermissionGranted()) {
    switch (action.getDialogState().context) {
    case 'weather':
      if (action.getDeviceLocation().city) {
        action.userStorage.location = action.getDeviceLocation().city;
        weather(action);
        return;
      }
      action.tell('Oops, I couldn\'t get your location');
      break;

    default:
      break;
    }
  } else {
    action.tell('Alright, aborting...');
  }
};

module.exports.dispatch = async action => {
  const input = await classify(action.getRawInput());

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
    fallback(action);
    break;
  }
};

function fallback (action) {
  action.ask('I\'m sorry, I don\'t understand.');
}

// dev dev dev devving
async function reset (action) {
  action.userStorage.location = null;
  action.userStorage.prog = {};
  action.tell('Removed user data');
}
