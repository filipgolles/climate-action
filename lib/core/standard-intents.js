module.exports.main = action => {
  if (action.userStorage.location) {
    action.ask('Welcome back!');
  } else {
    action.askForPermission('For weather reports', 'DEVICE_COARSE_LOCATION');
  }
};

module.exports.permission = action => {
  if (action.isPermissionGranted()) {
    action.userStorage.location = action.getDeviceLocation().city; // eslint-disable-line
    action.tell(`${ action.userStorage.location }, got it!`);
  } else {
    action.tell('Cannot penetrate tinfoil hat. Aborting...');
  }
};

module.exports.fallback = action => {
  action.ask('Sorry, I don\'t understand.');
};
