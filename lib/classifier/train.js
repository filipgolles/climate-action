const { LogisticRegressionClassifier } = require('natural');
const data = require('./data');

const CLASSIFIER_FILENAME = './lib/classifier/classifier.json';

const lrc = new LogisticRegressionClassifier();

module.exports = (async () => {
  try {
    await Promise.all(
      Object.keys(data).map(key => {
        return addDocs(key, data[key]);
      })
    );
    await lrc.train();
    await lrc.save(CLASSIFIER_FILENAME);
    return CLASSIFIER_FILENAME;
  } catch (err) {
    throw new Error(err.message);
  }
})();

async function addDocs(key, phrases) {
  phrases.map(phrase => {
    lrc.addDocument(phrase, key);
  });
}
