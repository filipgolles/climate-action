const test = require('tape');
const classify = require('../../lib/classifier/classify');

test('classifier: classify and extract args', async t => {
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
    {
      topic : 'food',
      args  : [ 'recipe', 'steak', 'fries' ]
    },
    {
      topic : 'food',
      args  : ['cook chicken']
    },
    {
      topic : 'present',
      args  : ['progress']
    },
    {
      topic : 'present',
      args  : ['worse']
    },
    {
      topic : 'register',
      args  : [ 'recycled tins', 'plastic' ]
    },
    {
      topic : 'register',
      args  : [ 'work today', 'rode', 'bike' ]
    },
    {
      topic : 'weather',
      args  : ['weather']
    },
    {
      topic : 'weather',
      args  : ['rain tonight']
    },
    {
      topic : 'reset',
      args  : [ 'user info', 'clear' ]
    },
    {
      topic : 'reset',
      args  : [ 'revoke', 'permissions' ]
    }
  ];

  const argKey = [];
  t.plan(10);
  inputs.forEach((str, i) => {
    classify(str).then(c => {
      t.deepEqual(
        c,
        key[i],
        `should classiy as ${ JSON.stringify(key[i], null, 2) }`
      );
    });
  });
});
