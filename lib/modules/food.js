const debug = require('debug')('dev:module:food');
const api = require('../apis/food.api');

module.exports = async (action, args) => {
  // get recipes from api
  const recipe = await api(args.map(arg => arg.tok).join(' '));
  if (recipe) {
    // see if there are any baddies
    const subs = await substitute(recipe.ingredients.split(', '));
    const response = assembleResponse(
      recipe.title,
      recipe.ingredients.split(', '),
      subs
    );
    action.tell(response);
  } else {
    action.tell(`Sorry, I can't find any matching recipes.`);
  }
};

function assembleResponse(title, ingredients, subs) {
  debug(subs);
  const ingredientString = ingredients.reduce((acc, cur, i, arr) => {
    return i === arr.length - 1 ?
      acc.concat('and ' + cur) :
      acc.concat(cur + ', ');
  }, '');

  // just pick the first one for now
  const subStr =
    subs.length > 0 ?
      `. Consider substituting ${subs[0].ingredient} for ${subs[0].sub} to ${
        subs[0].why
      }.` :
      '.';

  return `For "${title}", you will need ${ingredientString}${subStr}`;
}

async function substitute(ingredients) {
  const SUBSTITUTES = {
    meat: {
      sub: 'lentils, quinoa, or imitation meats',
      why: 'stop 26 kilograms of CO2 from reaching the atmosphere'
    },
    dairy: {
      sub: 'a dairy free alternative',
      why: 'reduce the footprint of your meal by 14 kilograms of CO2'
    },
    shell: {
      sub: 'oysters, clams, or mussels',
      why:
        'help keep our oceans healthy and discourage inhuman fishing practices'
    },
    fish: {
      sub: 'alaskan pollock, trout or arctic char',
      why: 'help prevent overfishing and the extinction of countless species'
    }
  };

  return ingredients.reduce((acc, ingredient) => {
    const flag = getFlag(ingredient);
    if (flag) {
      const {sub, why} = SUBSTITUTES[flag];
      return acc.concat({ingredient, sub, why});
    }
    return acc;
  }, []);
}

function getFlag(ingredient) {
  const FLAGGED_MEAT = [
    'beef',
    'ground beef',
    'ground meat',
    'veal',
    'mince',
    'lamb',
    'lambchops',
    'pork'
  ];
  const FLAGGED_DAIRY = ['butter', 'milk', 'cheese'];
  const FLAGGED_SHELL = ['shellfish', 'shrimp', 'prawns', 'crayfish'];
  const FLAGGED_FISH = ['salmon', 'tuna', 'cod', 'sea bass', 'seabass'];
  return FLAGGED_MEAT.includes(ingredient) ?
    'meat' :
    FLAGGED_DAIRY.includes(ingredient) ?
      'dairy' :
      FLAGGED_SHELL.includes(ingredient) ?
        'shell' :
        FLAGGED_FISH.includes(ingredient) ?
          'fish' :
          null;
}
