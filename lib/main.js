const ACTIONS_URI = '/climateaction';
const webhook = require('./core/webhook');

// getting dispatch function
const { dispatch } = require('./core/dispatcher');

// passing dispatch to webhook
webhook(ACTIONS_URI, dispatch);
