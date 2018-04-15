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
  const c1 = decodeCondition(body.current.condition.code);
  const c2 = decodeCondition(body.forecast.forecastday[0].day.condition.code);

  return {
    location: `${body.location.name}, ${body.location.country}`,
    conditions: [c1.condition, c2.condition],
    temps: [body.current.temp_c, body.forecast.forecastday[0].day.avgtemp_c],
    trans: [c1.transport, c2.transport]
  };
}

function decodeCondition(code) {
  return {
    1000: {
      transport: 0,
      condition: 'clear skies'
    },
    1003: {
      transport: 0,
      condition: 'partly cloudy'
    },
    1006: {
      transport: 0,
      condition: 'cloudy'
    },
    1009: {
      transport: 0,
      condition: 'overcast'
    },
    1030: {
      transport: 0,
      condition: 'mist'
    },
    1063: {
      transport: 0,
      condition: 'possible patches of rain'
    },
    1066: {
      transport: 0,
      condition: 'possible patches of snow'
    },
    1069: {
      transport: 0,
      condition: 'possible patches of sleet'
    },
    1072: {
      transport: 0,
      condition: 'possible patches of freezing drizzle'
    },
    1087: {
      transport: 0,
      condition: 'possible thunder'
    },
    1114: {
      transport: 0,
      condition: 'blowing snow'
    },
    1117: {
      transport: 1,
      condition: 'heavy snow'
    },
    1135: {
      transport: 0,
      condition: 'fog'
    },
    1147: {
      transport: 1,
      condition: 'freezing fog'
    },
    1150: {
      transport: 0,
      condition: 'patches of light drizzle'
    },
    1153: {
      transport: 0,
      condition: 'light drizzle'
    },
    1168: {
      transport: 1,
      condition: 'freezing drizzle'
    },
    1171: {
      transport: 1,
      condition: 'freezing drizzle'
    },
    1180: {
      transport: 0,
      condition: 'patches of light rain'
    },
    1183: {
      transport: 0,
      condition: 'light rain'
    },
    1186: {
      transport: 0,
      condition: 'moderate rain at times'
    },
    1189: {
      transport: 0,
      condition: 'moderate rain'
    },
    1192: {
      transport: 1,
      condition: 'heavy rain at times'
    },
    1195: {
      transport: 1,
      condition: 'heavy rain'
    },
    1198: {
      transport: 0,
      condition: 'light freezing rain'
    },
    1201: {
      transport: 1,
      condition: 'heavy freezing rain'
    },
    1204: {
      transport: 0,
      condition: 'light sleet'
    },
    1207: {
      transport: 1,
      condition: 'heavy sleet'
    },
    1210: {
      transport: 0,
      condition: 'patches of light snow'
    },
    1213: {
      transport: 0,
      condition: 'light snow'
    },
    1216: {
      transport: 0,
      condition: 'patches of snow'
    },
    1219: {
      transport: 1,
      condition: 'snow'
    },
    1222: {
      transport: 0,
      condition: 'patches of heavy snow'
    },
    1225: {
      transport: 1,
      condition: 'heavy snow'
    },
    1237: {
      transport: 1,
      condition: 'hail'
    },
    1240: {
      transport: 0,
      condition: 'light rain showers'
    },
    1243: {
      transport: 1,
      condition: 'rain showers'
    },
    1246: {
      transport: 1,
      condition: 'heavy rain showers'
    },
    1249: {
      transport: 0,
      condition: 'light sleet showers'
    },
    1252: {
      transport: 1,
      condition: 'heavy sleet showers'
    },
    1255: {
      transport: 0,
      condition: 'light snow showers'
    },
    1258: {
      transport: 1,
      condition: 'heavy snow showers'
    },
    1261: {
      transport: 0,
      condition: 'light hail'
    },
    1264: {
      transport: 0,
      condition: 'hail showers'
    },
    1273: {
      transport: 0,
      condition: 'patches of light rain with possible thunder'
    },
    1276: {
      transport: 0,
      condition: 'rain with possible thunderr'
    },
    1279: {
      transport: 0,
      condition: 'patches of light snow with possible thunder'
    },
    128: {
      transport: 1,
      condition: 'heavy snow with possible thunder'
    }
  }[code];
}
