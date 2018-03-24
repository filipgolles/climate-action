const test = require('tape');
const req = require('supertest');
const Joi = require('joi');
const webhook = require('../../lib/core/webhook');
const { weather } = require('./bodies');

test('full weather case', t => {
  const schema = Joi.object({
    expect_user_response : Joi.bool(),
    final_response       : Joi.object({
      speech_response: Joi.object({
        text_to_speech: Joi.string()
      })
    })
  });

  t.plan(2);
  req(webhook)
    .post('/climateaction')
    .send(weather)
    .then(r => {
      t.equal(r.status, 200, 'should return 200');
      t.equal(
        Joi.validate(r.body, schema).error,
        null,
        'should contain valid body'
      );
    });
});

webhook.close();
