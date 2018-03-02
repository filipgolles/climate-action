const { ActionsSdkApp } = require('actions-on-google');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(
  express.json(),
  morgan('dev', {
    skip: function(req, res) {
      return res.statusCode < 400; // eslint-disable-line no-magic-numbers
    }
  })
);

module.exports = (route, dispatch) => {
  app.route(route).post((req, res) => {
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
};
