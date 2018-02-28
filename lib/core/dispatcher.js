const classifier = require('./classifier');
const defaultHandler = require('./default-handler');

const handlers = [];

module.exports.register = handler => {
  handlers.push(handler); // eslint-disable-line
};

module.exports.dispatch = async action => {
  const intent = action.getIntent();
  if (intent === 'actions.intent.TEXT') {
    classifier(action.getRawInput()).then(topics => {
      dispatch(topics, action);
    });
  } else {
    defaultHandler(intent, action);
  }
};

function dispatch(topics, action) {
  handlers.find(handler => handler(topics, action));
}
