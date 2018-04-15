const debug = require('debug')('dev:module:food-api');
const got = require('got');

const {FOOD_ENDPOINT} = process.env;

module.exports = async str => {
  try {
    debug(str);
    const r = await got(FOOD_ENDPOINT, {
      method: 'get',
      json: true,
      query: {
        q: str
      }
    });
    debug(r.statusCode);
    return r.body.results.length > 0 ?
      r.body.results[1] :
      r.body.results.length === 0 ?
        r.body.results[0] :
        null;
  } catch (err) {
    debug(err.message);
    throw new Error(err.message);
  }
};
