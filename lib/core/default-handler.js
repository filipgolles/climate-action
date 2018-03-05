module.exports = (intent, action) => {
  switch (intent) {
  case 'actions.intent.MAIN':
    welcome(action);
    break;

  case 'actions.intent.PERMISSION':
    checkPermissions(action);
    break;

  case 'actions.intent.TEXT':
    fallback(action);
    break;

  default:
    break;
  }
};

function welcome(action) {
  if (action.userStorage.location) {
    action.ask('Welcome back!');
  } else {
    action.askForPermission('For weather reports', 'DEVICE_COARSE_LOCATION');
  }
}

function checkPermissions(action) {
  if (action.isPermissionGranted()) {
    action.userStorage.location = action.getDeviceLocation().city;
    action.tell(`${ action.userStorage.location }, got it!`);
  } else {
    action.tell('Cannot penetrate tinfoil hat. Aborting...');
  }
}

function fallback(action) {
  action.ask('I don\'t understand.');
}
