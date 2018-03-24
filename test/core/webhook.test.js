const test = require('tape');
const req = require('supertest');
const webhook = require('../../lib/core/webhook');

test('webhook: up and routing', t => {
  t.plan(2);
  req(webhook)
    .get('/')
    .then(res => {
      t.equal(res.status, 200, '"GET /" should return 200');
    });

  req(webhook)
    .post('/climateaction')
    .then(res => {
      t.equal(res.status, 200, '"POST /climateaction" should return 200');
    });
});

webhook.close();
