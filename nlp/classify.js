const { classify } = require('./classifier');
const { extract } = require('./extractor');

module.exports = async str => {
  return {
    topic : await classify(str),
    args  : await extract(str)
  };
};
