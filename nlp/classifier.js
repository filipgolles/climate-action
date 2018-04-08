const natural = require('natural');

if (module.parent) {
  const classifier = natural.LogisticRegressionClassifier.restore(
    require('./classifier.json')
  );

  module.exports.classify = async str => {
    const classes = classifier.getClassifications(str);
    return classes[0].value > classes[1].value ? classes[0].label : null;
  };
} else {
  // If not required by app, train and serialize a classifier
  const {LogisticRegressionClassifier} = require('natural');
  const {join} = require('path');
  const data = require('./data/classifier-training.json');

  const CLASSIFIER_FILENAME = join(__dirname, 'classifier.json');
  const lrc = new LogisticRegressionClassifier();

  const addDocs = async (key, phrases) => {
    phrases.map(phrase => lrc.addDocument(phrase, key)
    );
  };

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
      console.log(`Classifier saved at ${CLASSIFIER_FILENAME}`);
    })
    .catch(err => {
      throw new Error(err.message);
    });
}
