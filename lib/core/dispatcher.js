const handlers = new Map();

module.exports.register = (intent, handler) => {
  handlers.set(intent, handler);
  console.log(`${ intent } ${ handler } registered`);
  return true;
};

module.exports.dispatch = (req, res) => {
  console.log(`dispatch ${ req }`);
};
