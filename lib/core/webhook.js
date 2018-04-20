const express = require('express');
const {ActionsSdkApp} = require('actions-on-google');
const {dispatch, main, permission} = require('./dispatcher');
const log = require('debug')('climateactions:webhook');

module.exports = express()
  .use(express.json())
  .post('/hook', (req, res) => {
    const action = new ActionsSdkApp({
      request: req,
      response: res
    });

    switch (action.getIntent()) {
      case action.StandardIntents.MAIN:
        main(action);
        break;

      case action.StandardIntents.PERMISSION:
        permission(action);
        break;

      default:
        dispatch(action);
        break;
    }
  })

  .listen(process.env.PORT, log(`Listening on port: ${process.env.PORT}`));
