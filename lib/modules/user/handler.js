const { register } = require('../../core/dispatcher');

module.exports = register((type, action) => {
  console.log(`user - ${ type }: ${ action }`);
});

function handle() {}
