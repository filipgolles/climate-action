const { generate } = require('node-rake');

const classifier = require('natural').LogisticRegressionClassifier.restore(
  require('./classifier.json')
);

module.exports = async str => {
  return {
    topic : classifier.classify(str),
    args  : generate(str)
  };
};
