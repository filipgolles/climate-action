const ACTIONS_URI = '/climateaction';
const webhook = require('./core/webhook');

// getting dispatch function
const { dispatch } = require('./core/dispatcher');

// giving dispatch to webhook
webhook.route(ACTIONS_URI, dispatch);

// waking up modules
require('./modules/weather/handler');
require('./modules/user/handler');

// server start
webhook.start();
