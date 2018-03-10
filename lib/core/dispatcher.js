// const classifier = require('./classifier');
const classify = require('../nlp/classify');
const defaultHandler = require('./default-handler');
const handlers = require('../modules/');

// let classifier = null;
// module.exports.init = cls => {
//   // console.log(cls.toString());
//   classifier = cls; // eslint-disable-line fp/no-mutation
// };
// console.log(classifier.toString());

module.exports.dispatch = async action => {
  const intent = action.getIntent();
  console.log(classify);
  classify(action.getRawInput()).then(res => {
    console.log(res);
  });
  if (intent === 'actions.intent.TEXT') {
    // classifier(action.getRawInput()).then(topics => {
    //   console.log(topics);
    //   const handled = dispatch(topics, action);
    //   if (!handled) defaultHandler(intent, action);
    // });
  } else {
    defaultHandler(intent, action);
  }
};

function dispatch(topics, action) {
  return handlers.find(handler => handler(topics, action));
}
