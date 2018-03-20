const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const test = require('tape');
const { classify, extractArgs } = require('../lib/classifier/classify');

const lstat = promisify(fs.lstat);

test('train new classifier', async assert => {
  const CLASSIFIER_FILENAME = '/lib/classifier/classifier.json';
  const pre = await lstat(path.join(process.cwd(), CLASSIFIER_FILENAME));
  const filename = await require('../lib/classifier/train');
  const post = await lstat(path.join(process.cwd(), CLASSIFIER_FILENAME));
  assert.equal(typeof filename, 'string', 'should return filename as string');
  assert.notDeepEqual(post, pre, 'file should have changed');
  assert.end();
});

test('classify strings', async assert => {
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

  const classes = await Promise.all(inputs.map(str => classify(str)));
  assert.deepEqual(classes, key, 'should classify inputs as expected');
  assert.end();
});

test('extract args', async assert => {
  const input = [
    'recipe for steak and fries',
    'i recycled tins and bottles today'
  ];

  const key = [[ 'steak', 'fries' ], [ 'recycled', 'tins', 'bottles' ]];

  const args = await Promise.all(input.map(str => extractArgs(str)));
  assert.deepEqual(args, key, 'should extract args as expected');
  assert.end();
});
