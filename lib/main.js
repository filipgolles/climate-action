const ACTIONS_URI = '/climateaction';
const webhook = require('./core/webhook');

// getting dispatcher
const { dispatch } = require('./core/dispatcher');

// dispatcher.init(classifier);

// passing dispatch function to webhook
webhook(ACTIONS_URI, dispatch);

// ONLY FOR TESTING

// const { cheat } = require('./modules/recipes/handler');
// cheat('spaghetti bolognese');

// just analysis (textrazor) for now
const classifier = require('./nlp/extract');

// weather
classifier('what will the weather be like today')
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(e => console.error(e));
// classifier('will it ever stop raining?')
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(e => console.error(e));

// // // recipe
// classifier('give me the recipe for spaghetti bolognese with cheese')
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(e => console.error(e));
// classifier('how to cook chicken and ketchup?')
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(e => console.error(e));

// // // register
// classifier('i ate tofu instead of ham')
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(e => console.error(e));
// classifier('didn\'t take the car to work today')
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(e => console.error(e));

// // // present
// classifier('am i doing better than last week?')
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(e => console.error(e));
// classifier('what\'s my progress?')
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(e => console.error(e));

// // // decoy
// classifier('the super good other guys')
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(e => console.error(e));
// classifier('run with scissors, playing the cello')
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(e => console.error(e));
// classifier('who is death if not my own')
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(e => console.error(e));
// classifier('eternity is never long enough')
//   .then(res => console.log(JSON.stringify(res, null, 2)))
//   .catch(e => console.error(e));
