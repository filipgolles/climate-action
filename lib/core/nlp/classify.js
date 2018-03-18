const { LogisticRegressionClassifier } = require('natural');
const lrc = require('./classifier');
const analyze = require('./analyze');

const classifier = LogisticRegressionClassifier.restore(lrc);

module.exports = async str => {
  const scores = await classifier.getClassifications(str);
  if (scores[0].value > scores[1].value) {
    // const args = await analyze(str);
    return scores[0].label;
  }
  return null;
};
