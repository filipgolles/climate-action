const ACTIONS_URI = '/climateaction';
const webhook = require('./core/webhook');

// getting dispatch function
const { dispatch } = require('./core/dispatcher');

// passing dispatch to webhook
webhook(ACTIONS_URI, dispatch);

// ONLY FOR TESTING
// const { cheat } = require('./modules/recipes/handler');

// cheat('spaghetti bolognese');
const classifier = require('./core/classifier');

// weather
// classifier('what will the weather be like today');
// classifier('will it ever stop raining?');

// // recipe
// classifier('give me the recipe for spaghetti bolognese with cheese');
// classifier('how to cook chicken and ketchup?');

// // register
// classifier('i ate tofu instead of ham');
// classifier('didn\'t take the car to work today');

// // present
// classifier('am i doing better than last week?');
// classifier('what\'s my progress?');

// // decoy
// classifier('the super good other guys');
// classifier('run with scissors, playing the cello');
// classifier('who is death if not my own');
// classifier('eternity is never long enough');
