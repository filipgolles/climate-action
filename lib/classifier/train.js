const { LogisticRegressionClassifier } = require('natural');
const data = require('./data');

const CLASSIFIER_FILENAME = './lib/classifier/classifier.json';

const lrc = new LogisticRegressionClassifier();
lrc.events.once('trainedWithDocument', ob => {
  console.log(`Training with ${ ob.total } documents...`);
});
lrc.events.on('doneTraining', () => {
  console.log('Training done.');
});

(async () => {
  Promise.all(
    Object.keys(data).map(
      key => new Promise(resolve => resolve(addDocs(key, data[key])))
    )
  )
    .then(() => {
      lrc.train();
    })
    .then(() => {
      lrc.save(CLASSIFIER_FILENAME);
    })
    .then(() => {
      console.log(`Classifier saved as ${ CLASSIFIER_FILENAME }`);
    })
    .catch(e => {
      console.error(e.message);
    });
})();

async function addDocs(key, phrases) {
  phrases.map(phrase => {
    lrc.addDocument(phrase, key);
  });
}
