const { register } = require('../../core/dispatcher');

module.exports = register((type, action) => {
  console.log(`weather - ${ type }: ${ action }`);
});

function handle() {}
