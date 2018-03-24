const test = require('tape');
const {
  main,
  permission,
  fallback
} = require('../../lib/core/standard-intents');

test('standard-intents: MAIN', async assert => {
  const mainNewKey = [ 'For weather reports', 'DEVICE_COARSE_LOCATION' ];
  const mainNew = {
    userStorage : {},
    getIntent   : function() {
      return 'actions.intent.MAIN';
    },
    askForPermission: function(str, perm) {
      this.res = [ str, perm ];
    }
  };

  const mainReturningKey = 'Welcome back!';
  const mainReturning = {
    userStorage : { location: 'umea' },
    getIntent   : function() {
      return 'actions.intent.MAIN';
    },
    ask: function(str) {
      this.res = str;
    }
  };

  await main(mainNew);
  assert.deepEqual(mainNew.res, mainNewKey, 'should ask for permissions');

  await main(mainReturning);
  assert.deepEqual(mainReturning.res, mainReturningKey, 'should welcome back');

  assert.end();
});

test('standard-intents: intent.PERMISSION', async assert => {
  const acceptKey = 'umea, got it!';
  const accept = {
    userStorage : {},
    getIntent   : function() {
      return 'actions.intent.PERMISSION';
    },
    isPermissionGranted: function() {
      return true;
    },
    getDeviceLocation: function() {
      return { city: 'umea' };
    },
    tell: function(str) {
      this.res = str;
    }
  };

  const declineKey = 'Cannot penetrate tinfoil hat. Aborting...';
  const decline = {
    userStorage : {},
    getIntent   : function() {
      return 'actions.intent.PERMISSION';
    },
    isPermissionGranted: function() {
      return false;
    },
    tell: function(str) {
      this.res = str;
    }
  };

  await permission(accept);
  assert.equal(accept.res, acceptKey, 'should return users location');

  await permission(decline);
  assert.equal(decline.res, declineKey, 'should trigger abort-reponse');

  assert.end();
});

test('standard-intents: fallback', async assert => {
  const invalidKey = 'Sorry, I don\'t understand.';
  const invalid = {
    getIntent: function() {
      return 'really invalid string';
    },
    ask: function(str) {
      this.res = str;
    }
  };

  await fallback(invalid);
  assert.equal(invalid.res, invalidKey, 'should trigger fallback reponse');
  assert.end();
});
