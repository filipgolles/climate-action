// const classifier = require('./classifier');
const classify = require('./nlp/classify');
const handlers = require('../modules/handlers');
const { main, permission, fallback } = require('./standard-intents');

// let classifier = null;
// module.exports.init = cls => {
//   // console.log(cls.toString());
//   classifier = cls; // eslint-disable-line fp/no-mutation
// };
// console.log(classifier.toString());

// module.exports.dispatch = async action => {
//   const intent = action.getIntent();
//   console.log(classify);
//   classify(action.getRawInput()).then(res => {
//     console.log(res);
//   });
//   if (intent === 'actions.intent.TEXT') {
//     // classifier(action.getRawInput()).then(topics => {
//     //   console.log(topics);
//     //   const handled = dispatch(topics, action);
//     //   if (!handled) defaultHandler(intent, action);
//     // });
//   } else {
//     defaultHandler(intent, action);
//   }
// };

module.exports.dispatchUserInput = async action => {};

module.exports.dispatchStandardIntent = async action => {
  switch (action.getIntent()) {
  case 'actions.intent.MAIN':
    main(action);
    break;

  case 'actions.intent.PERMISSION':
    permission(action);
    break;

  default:
    break;
  }
};

// function dispatch(topics, action) {
//   return handlers.find(handler => handler(topics, action));
// }

// just for testing. str == action.getRawInput() in the real func
module.exports.test = async str => {
  const classified = await classify(str);
  console.log(classified);
  if (classified !== null) {
    console.log(classified);
    const handled = await Promise.all(
      handlers.map(h => {
        return h(classified.topic);
      })
    );

    console.log(handled);
  } else {
    // fallback() needs an action
    console.log('fallback says: "huh?');
  }
};
