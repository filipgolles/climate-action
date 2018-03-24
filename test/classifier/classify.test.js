const test = require('tape');
const { classify, extractArgs } = require('../../lib/classifier/classify');

test('classifier: classify strings', async assert => {
  const inputs = [
    'recipe for steak and fries',
    'tell me how to cook chicken',
    'tell me about my progress',
    'am i doing worse that before?',
    'i recycled tins and plastic',
    'rode my bike to work today',
    'what is the weather like?',
    'will it rain tonight?',
    'clear my user info',
    'revoke my given permissions'
  ];

  const key = [
    'food',
    'food',
    'present',
    'present',
    'register',
    'register',
    'weather',
    'weather',
    'reset',
    'reset'
  ];
  assert.plan(10);
  inputs.forEach((str, i) => {
    classify(str).then(c => {
      assert.equal(c, key[i], `correctly classified: ${ key[i] }`);
    });
  });
});

test('classifier: extract args', async assert => {
  const input = [
    'recipe for steak and fries',
    'i recycled tins and bottles today'
  ];

  const key = [[ 'steak', 'fries' ], [ 'recycled', 'tins', 'bottles' ]];
  assert.plan(2);

  extractArgs(input[0]).then(args => {
    assert.deepEqual(args, key[0], `correctly extracted: ${ key[0] }`);
  });

  extractArgs(input[1]).then(args => {
    assert.deepEqual(args, key[1], `correctly extracted: ${ key[1] }`);
  });
});
