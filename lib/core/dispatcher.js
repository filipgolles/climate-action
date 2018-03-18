const classify = require('./nlp/classify');
const analyze = require('./nlp/analyze');
const { weather, register, present, food } = require('../modules/handlers');
const { main, permission, fallback } = require('./standard-intents');

module.exports = async action => {
  switch (action.getIntent()) {
  case 'actions.intent.MAIN':
    main(action);
    break;
  case 'actions.intent.PERMISSION':
    permission(action);
    break;
  case 'actions.intent.TEXT':
    toHandlers(action);
    break;
  default:
    fallback(action);
    break;
  }
};

async function toHandlers(action) {
  switch (await classify(action.getRawInput())) {
  case 'weather':
    weather(action);
    break;
  case 'register':
    register(action, analyze(action.getRawInput()));
    break;
  case 'present':
    present(action);
    break;
  case 'food':
    food(action, analyze(action.getRawInput()));
    break;
  default:
    fallback(action);
    break;
  }
}
