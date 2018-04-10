const debug = require('debug')('dev:module:food');
const got = require('got');

const {FOOD_SEARCH_ENDPOINT, FOOD_GET_ENDPOINT, FOOD_KEY} = process.env;

// sending: array of words
// want: list of ingredients

module.exports = async (action, args) => {
  debug('food: ', args);
  const filteredArgs = filterArgs(args);
  const firstTry = await search(filteredArgs.join(' '));
  const recipes =
    firstTry.length > 0 ?
      firstTry :
      await search(filteredArgs.slice(0, filteredArgs.length - 1).join(' '));

  if (recipes.length > 0) {
    const recipe = await getRecipe(recipes[0].recipe_id);
    substitute(recipe.ingredients);
  } else {
    debug('giving up..');
  }
};

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

function substitute(ingredients) {
  debug(ingredients);
}

function filterArgs(args) {
  const EXCLUDED_WORDS = ['recipe'];
  return args
    .filter(
      arg =>
        !EXCLUDED_WORDS.includes(arg.tok) && !EXCLUDED_WORDS.includes(arg.lem)
    )
    .map(arg => arg.tok);
}

// below here is dev stuff
const devArgs = [
  {pos: 3, tok: 'recipe', lem: 'recipe', tag: 'NN', lnk: null},
  {
    pos: 5,
    tok: 'spaghetti',
    lem: 'spaghetti',
    tag: 'NN',
    lnk: null
  },
  {pos: 6, tok: 'bolognese', lem: 'bolognese', tag: 'NN', lnk: 4},
  {pos: 8, tok: 'cheese', lem: 'cheese', tag: 'NN', lnk: 7}
];

food(devArgs);

async function food(args) {
  const filteredArgs = filterArgs(args);
  const firstTry = await search(filteredArgs.join(' '));
  const recipes =
    firstTry.length > 0 ?
      firstTry :
      await search(filteredArgs.slice(0, filteredArgs.length - 1).join(' '));

  if (recipes.length > 0) {
    const recipe = await getRecipe(recipes[0].recipe_id);
    substitute(recipe.ingredients);
  } else {
    debug('giving up..');
  }
}
