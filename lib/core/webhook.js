const { ActionsSdkApp } = require('actions-on-google');
const express = require('express');
const classify = require('./classify');
const dispatch = require('./dispatcher');
const { main, permission, fallback } = require('./standard-intents');

const app = express();

// parsing and logging and things
app.use(express.json());

app.post('/hook', (req, res) => {
  const action = new ActionsSdkApp({
    request  : req,
    response : res
  });

  switch (action.getIntent()) {
  case 'actions.intent.MAIN':
    main(action);
    break;

  case 'actions.intent.PERMISSION':
    permission(action);
    break;

  case 'actions.intent.TEXT':
    classify(action.getRawInput())
      .then(input => dispatch(action, input))
      .catch(err => {
        console.log(err.message);
        fallback(action);
      });
    break;

  default:
    fallback(action);
    break;
  }
});

module.exports = app.listen(process.env.PORT);
