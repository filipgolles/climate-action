const got = require('got');

const {WEATHER_ENDPOINT, WEATHER_KEY} = process.env;

module.exports = async loc => {
  try {
    const r = await got(WEATHER_ENDPOINT, {
      method: 'get',
      json: true,
      query: {
        key: WEATHER_KEY,
        q: loc
      }
    });
    return formatResponse(r.body);
  } catch (err) {
    throw new Error(err.message);
  }
};

async function formatResponse(body) {
  const c1 = body.current.condition.code;
  const c2 = body.forecast.forecastday[0].day.condition.code;

  return {
    location: `${body.location.name}, ${body.location.country}`,
    conditions: [decodeCondition(c1), decodeCondition(c2)],
    temps: [body.current.temp_c, body.forecast.forecastday[0].day.avgtemp_c]
  };
}

function decodeCondition(code) {
  return {
    1000: 'clear skies',
    1003: 'partly cloudy',
    1006: 'cloudy',
    1009: 'overcast',
    1030: 'mist',
    1063: 'possible patches of rain',
    1066: 'possible patches of snow',
    1069: 'possible patches of sleet',
    1072: 'possible patches of freezing drizzle',
    1087: 'possible thunder',
    1114: 'blowing snow',
    1117: 'heavy snow',
    1135: 'fog',
    1147: 'freezing fog',
    1150: 'patches of light drizzle',
    1153: 'light drizzle',
    1168: 'freezing drizzle',
    1171: 'freezing drizzle',
    1180: 'patches of light rain',
    1183: 'light rain',
    1186: 'moderate rain at times',
    1189: 'moderate rain',
    1192: 'heavy rain at times',
    1195: 'heavy rain',
    1198: 'light freezing rain',
    1201: 'heavy freezing rain',
    1204: 'light sleet',
    1207: 'heavy sleet',
    1210: 'patches of light snow',
    1213: 'light snow',
    1216: 'patches of snow',
    1219: 'snow',
    1222: 'patches of heavy snow',
    1225: 'heavy snow',
    1237: 'hail',
    1240: 'light rain showers',
    1243: 'rain showers',
    1246: 'heavy rain showers',
    1249: 'light sleet showers',
    1252: 'heavy sleet showers',
    1255: 'light snow showers',
    1258: 'heavy snow showers',
    1261: 'light hail',
    1264: 'hail showers',
    1273: 'patches of light rain with possible thunder',
    1276: 'rain with possible thunderr',
    1279: 'patches of light snow with possible thunder',
    128: 'heavy snow with possible thunder'
  }[code];
}
