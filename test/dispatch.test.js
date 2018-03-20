const test = require('tape');
const dispatch = require('../lib/core/dispatcher');

test('dispatch: intent.MAIN', async assert => {
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

  await dispatch(mainNew);
  assert.deepEqual(mainNew.res, mainNewKey, 'should ask for permissions');

  await dispatch(mainReturning);
  assert.deepEqual(mainReturning.res, mainReturningKey, 'should welcome back');

  assert.end();
});

test('dispatch: intent.PERMISSION', async assert => {
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

  await dispatch(accept);
  assert.equal(accept.res, acceptKey, 'should return location');

  await dispatch(decline);
  assert.equal(decline.res, declineKey, 'should return "abortion" string');

  assert.end();
});

test('dispatch: intent.TEXT', async assert => {
  const key = 'Sorry, I don\'t understand.';
  const action = {
    getIntent: function() {
      return 'actions.intent.TEXT';
    },
    getRawInput: function() {
      return '';
    },
    ask: function(str) {
      this.res = str;
    }
  };

  await dispatch(action);
  assert.equal(action.res, key, 'should return "bad intent" string');
  assert.end();
});

test('dispatch: invalid intent', async assert => {
  const invalidKey = 'Sorry, I don\'t understand.';
  const invalid = {
    getIntent: function() {
      return 'really invalid string';
    },
    ask: function(str) {
      this.res = str;
    }
  };

  await dispatch(invalid);
  assert.equal(invalid.res, invalidKey, 'should return "bad intent" string');
  assert.end();
});
