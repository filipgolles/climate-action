const got = require('got');

const { WEATHER_ENDPOINT, WEATHER_KEY } = process.env;

const CONDITIONS = require('./weather-conditions');

module.exports = async action => {
  if (action.userStorage.location) {
    console.log(`Got location: ${ action.userStorage.location }`);
    const r = await fireRequest(action.userStorage.location);
    action.tell(await formatAndAssemble(r.body));
  } else {
    console.log('--- No location ---');
    action.askForPermission(
      'For weather reports',
      action.SupportedPermissions.DEVICE_COARSE_LOCATION,
      { context: 'weather' }
    );
  }
  // const r = await fireRequest(action.userStorage.location);
  // action.tell(await formatAndAssemble(r.body));
};

async function fireRequest (location) {
  try {
    return await got(WEATHER_ENDPOINT, {
      method : 'get',
      json   : true,
      query  : {
        key : WEATHER_KEY,
        q   : location
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function formatAndAssemble (rawData) {
  const codeC = rawData.current.condition.code;
  const codeL = rawData.forecast.forecastday[0].day.condition.code;

  const res = {
    location: {
      name    : rawData.location.name,
      country : rawData.location.country
    },
    current: {
      condition   : CONDITIONS[codeC].current,
      temperature : rawData.current.temp_c
    },
    later: {
      condition   : CONDITIONS[codeL].future,
      temperature : rawData.forecast.forecastday[0].day.avgtemp_c
    }
  };
  return `Conditions in ${ res.location.name }, ${
    res.location.country
  } are currently ${ res.current.condition } with a temperature of ${
    res.current.temperature
  } degrees. Later today it looks like ${ res.later.condition } and ${
    res.later.temperature
  } degrees. Why not ride your bike to work today?`;
}
