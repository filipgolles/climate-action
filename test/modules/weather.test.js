const test = require('tape');
const {
  apixuTest,
  assemblyTest
} = require('../../lib/modules/weather/handler');

test('weather module', async assert => {
  const res = await apixuTest('umea');
  assert.equal(res.statusCode, 200, 'should return 200 OK');
  const tts = await assemblyTest(res.body);
  assert.equal(typeof tts, 'string', 'should return string');
  assert.end();
});
