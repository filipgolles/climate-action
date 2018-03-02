const request = require('request');

// location hard coded for now
const LOCATION = 'umea';
const HANDLED_CATEGORY = 'weather';
const CONDITIONS = require('./conditions');

module.exports = function handler(topics, action) {
  if (topics.includes(HANDLED_CATEGORY)) {
    exec(action);
    return true;
  }
  return false;
};

function exec(action) {
  fetchData(rawData => {
    const responseString = formatAndAssemble(rawData);
    const prompt = action.buildInputPrompt(false, responseString);
    action.ask(prompt);
  });
}

function fetchData(callback) {
  request.get(
    {
      uri  : 'http://api.apixu.com/v1/forecast.json?',
      json : true,
      qs   : {
        key : process.env.APIXU_KEY,
        q   : LOCATION
      }
    },
    (e, res) => {
      if (e) {
        throw new Error(e.message);
      } else {
        callback(res.body);
      }
    }
  );
}

function formatAndAssemble(rawData) {
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
