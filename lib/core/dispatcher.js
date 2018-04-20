const classify = require('../../nlp/classify');
const {weather, register, present, food} = require('../modules');
const log = require('debug')('climateactions:dispatch');

module.exports.main = action => {
  log('dispatch MAIN intent');
  // Making sure all storage props exist
  if (!action.userStorage.location) {
    action.userStorage.location = null;
  }

  if (!action.userStorage.performance) {
    action.userStorage.performance = {
      active: {},
      archive: []
    };
  }

  // New users should get some kind of tutorial
  if (action.getUser().lastSeen) {
    action.ask('Hello again!');
  } else {
    action.ask('Hey, new user! I am Sustainability Sam');
  }
};

module.exports.permission = action => {
  log('dispatch PERMISSION intent');
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
  log('dispatch TEXT intent as:');
  const input = await classify(action.getRawInput());
  log(`topic: ${input.topic}\n args: ${input.args}`);

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
      fallback(action, input.args);
      break;
  }
};

function fallback(action) {
  action.ask('I\'m sorry, I don\'t understand.');
}

async function reset(action) {
  action.userStorage.location = null;
  action.userStorage.performance = {
    active: {},
    archive: []
    // archive: [
    //   {
    //     week: 15,
    //     tasks: ['recycled tins', 'recycled tins', 'unknown'],
    //     keywords: ['recycle', 'recycle', 'recycle'],
    //     prev: 12
    //   },
    //   {
    //     week: 11,
    //     tasks: ['recycled tins', 'recycled tins', 'unknown'],
    //     keywords: ['recycle', 'recycle', 'recycle'],
    //     prev: 12
    //   }
    // ]
  };
  action.tell('Wiped every memory.');
}
