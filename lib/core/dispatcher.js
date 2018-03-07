const classifier = require('./classifier');
const defaultHandler = require('./default-handler');
const handlers = require('../modules/');

module.exports.dispatch = async action => {
  const intent = action.getIntent();
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
