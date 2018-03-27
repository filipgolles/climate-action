const { generate } = require('node-rake');
const natural = require('natural');
const stopwords = require('../../classifier/data/extraction-stopwords.json');

const classifier = natural.LogisticRegressionClassifier.restore(
  require('../../classifier/classifier')
);

module.exports = async str => {
  return {
    topic : classifier.classify(str),
    args  : generate(str, stopwords.words)
  };
};
