const test = require('tape');

test('classifier: train and save', async assert => {
  const CLASSIFIER_FILENAME = './lib/classifier/classifier.json';
  assert.plan(2);
  assert.doesNotThrow(() => {
    require('../../lib/classifier/train').then(fn => {
      assert.equal(fn, CLASSIFIER_FILENAME, 'should return expected path');
    });
  }, 'should not throw');
});
