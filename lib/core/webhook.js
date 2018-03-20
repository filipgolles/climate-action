const { ActionsSdkApp } = require('actions-on-google');
const express = require('express');
const morgan = require('morgan');
const dispatch = require('./dispatcher');

const WEBHOOK_URI = '/climateaction';
const app = express();

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
  dispatch(
    new ActionsSdkApp({
      request  : req,
      response : res
    })
  );
});

app.listen(process.env.PORT, () => {
  process.stdout.write(`Serving port: ${ process.env.PORT }\n`);
});
