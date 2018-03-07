const request = require('request');
const { BayesClassifier } = require('natural');

const TEXTRAZOR_ENDPOINT = 'https://api.textrazor.com';
const { TEXTRAZOR_KEY } = process.env;

const bayes = new BayesClassifier();

const weatherPhrases = [
  'tell me about the weather',
  'what will the weather be like',
  'give me the weather forecast for today',
  'is it raining outside',
  'how cold is it'
];

const registerPhrases = [
  'i recycled today',
  'me and some work friends are starting a car pool',
  'ate vegitarian today',
  'i rode my bicycle to work',
  'bought a season ticket for the bus'
];

const presentationPhrases = [
  'how am i doing',
  'am i doing better than last week',
  'tell me about my progress',
  'how climate friendly have i been',
  'am i doing worse than before'
];

const recipePhrases = [
  'tell me the recipe for spaghetti',
  'how do i cook nestles',
  'recipe for iced tea please',
  'how long to boil eggs',
  'stir fry recipe'
];

weatherPhrases.map(phrase => {
  bayes.addDocument(phrase, 'weather');
});

registerPhrases.map(phrase => {
  bayes.addDocument(phrase, 'progress-register');
});

presentationPhrases.map(phrase => {
  bayes.addDocument(phrase, 'progress-presentation');
});

recipePhrases.map(phrase => {
  bayes.addDocument(phrase, 'recipe');
});

bayes.train();

const analyze = rawText => new Promise((resolve, reject) => {
  request(
    {
      method  : 'POST',
      url     : TEXTRAZOR_ENDPOINT,
      gzip    : true,
      json    : true,
      headers : {
        'X-TextRazor-Key' : TEXTRAZOR_KEY,
        'Accept-encoding' : 'gzip'
      },
      form: {
        text       : rawText,
        extractors : 'entities,relations'
      }
    },
    (e, res, body) => {
      if (e) {
        reject(e.message);
      } else {
        resolve(body.response);
      }
    }
  );
});

const extract = async rawText => {
  const processed = await analyze(rawText);

  if (processed) {
    if (processed.entities) {
      return processed.entities
        .reduce((args, ent) => args.concat(ent.matchedText, ' '), '')
        .trim();
    } else if (processed.properties) {
      const words = rawText.split(' ');
      const props = processed.properties[processed.properties.length - 1];
      return props.propertyPositions
        .reduce((args, prop) => args.concat(words[prop], ' '), '')
        .trim();
    } else if (processed.sentences) {
      const words = processed.sentences.reduce(
        (words, sentence) => words.concat(sentence.words),
        []
      );
      const nouns = words.reduce((nns, word) => {
        if (word.partOfSpeech === 'NN') {
          return nns.concat(word.token, ' ');
        }
        return nns;
      }, '');
      return nouns;
    }

    return null;
  }
};

module.exports = async rawText => {
  const classes = bayes.getClassifications(rawText);
  if (classes[0].value <= classes[1].value) {
    return null;
  }
  const event = {
    label : classes[0].label,
    args  : await extract(rawText)
  };

  return event;
};
