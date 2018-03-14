const { ActionsSdkApp } = require('actions-on-google');
const express = require('express');
const morgan = require('morgan');
const {
  dispatchStandardIntent,
  dispatchUserInput,
  test
} = require('./dispatcher');

const WEBHOOK_URI = '/climateaction';
const app = express();

// =========== TESTING =============
const str = 'i recycled some bottles today';
test(str);
// =================================

// parsing and logging and things
app.use(
  express.json(),
  morgan('dev', {
    skip: function(req, res) {
      return res.statusCode < 400;
    }
  })
);

// route for actions
app.route(WEBHOOK_URI).post((req, res) => {
  const action = new ActionsSdkApp({
    request  : req,
    response : res
  });
  if (action.getIntent() === 'actions.intent.TEXT') {
    dispatchUserInput(action);
  } else {
    dispatchStandardIntent(action);
  }
});

app.listen(process.env.PORT, () => {
  process.stdout.write(`Serving port: ${ process.env.PORT }\n`);
});
