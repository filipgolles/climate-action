const api = require('../apis/weather.api');

module.exports = async action => {
  if (action.userStorage.location) {
    const data = await api(action.userStorage.location);
    action.tell(await makeResponse(data));
  } else {
    action.askForPermission(
      'For weather reports',
      action.SupportedPermissions.DEVICE_COARSE_LOCATION,
      {context: 'weather'}
    );
  }
};

async function makeResponse({location, conditions, temps} = {}) {
  const parts = [
    `Currently in ${location}:`,
    `${conditions[0]} and ${temps[0]} degrees.`,
    `Later, ${conditions[1]} and ${temps[1]} degrees.`,
    `Why not leave the car at home today?`
  ];
  return parts.join(' ');
}
