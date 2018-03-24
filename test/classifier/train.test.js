const test = require('tape');

test('classifier: train and save', async t => {
  const CLASSIFIER_FILENAME = './lib/classifier/classifier.json';
  t.plan(2);
  t.doesNotThrow(() => {
    require('../../lib/classifier/train').then(fn => {
      t.equal(fn, CLASSIFIER_FILENAME, 'should return expected path');
    });
  }, 'should not throw');
});
