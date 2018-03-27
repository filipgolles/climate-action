const { LogisticRegressionClassifier } = require('natural');
const { join } = require('path');
const data = require('./data/classifier-training.json');

const CLASSIFIER_FILENAME = join(__dirname, 'classifier.json');
const lrc = new LogisticRegressionClassifier();

async function addDocs (key, phrases) {
  phrases.map(phrase => {
    lrc.addDocument(phrase, key);
  });
}

Promise.all(
  Object.keys(data).map(key => {
    return addDocs(key, data[key]);
  })
)
  .then(() => {
    lrc.train();
  })
  .then(() => {
    lrc.save(CLASSIFIER_FILENAME);
  })
  .then(() => {
    console.log(`Classifier saved at ${ CLASSIFIER_FILENAME }`);
  })
  .catch(err => {
    throw new Error(err.message);
  });
