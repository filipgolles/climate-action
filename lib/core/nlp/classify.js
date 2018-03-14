const { LogisticRegressionClassifier } = require('natural');
const lrc = require('../../classifier/classifier.json');
const analyze = require('./analyze');

const classifier = LogisticRegressionClassifier.restore(lrc);

module.exports = async str => {
  const scores = await classifier.getClassifications(str);
  if (scores[0].value > scores[1].value) {
    const args = await analyze(str);
    return {
      topic : scores[0].label,
      args  : args
    };
  }
  return null;
};
