const debug = require('debug')('dev:module:food');
const got = require('got');

const {FOOD_SEARCH_ENDPOINT, FOOD_GET_ENDPOINT, FOOD_KEY} = process.env;

module.exports = async words => {};

async function search(str) {
  try {
    const r = await got(FOOD_SEARCH_ENDPOINT, {
      method: 'get',
      json: true,
      query: {
        key: FOOD_KEY,
        q: str
      }
    });
    return r.body.recipes;
  } catch (err) {
    debug(err.message);
    throw new Error(err.message);
  }
}

async function getRecipe(id) {
  try {
    const r = await got(FOOD_GET_ENDPOINT, {
      method: 'get',
      json: true,
      query: {
        key: FOOD_KEY,
        rId: id
      }
    });
    return r.body.recipe;
  } catch (err) {
    debug(err.message);
    throw new Error(err.message);
  }
}
