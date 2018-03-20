const got = require('got');
const { LogisticRegressionClassifier } = require('natural');
const lrc = require('./classifier');

const classifier = LogisticRegressionClassifier.restore(lrc);
const { NLP_KEY, NLP_ENDPOINT } = process.env;

module.exports.classify = async str => {
  const scores = await classifier.getClassifications(str);
  if (scores[0].value > scores[1].value) {
    return scores[0].label;
  }
  return null;
};

module.exports.extractArgs = async str => {
  try {
    const r = await got(NLP_ENDPOINT, {
      method  : 'post',
      json    : true,
      form    : true,
      timeout : 10000,
      headers : {
        'Accept-encoding' : 'gzip',
        'X-TextRazor-Key' : NLP_KEY
      },
      body: {
        extractors : 'words,relations,senses',
        text       : str
      }
    });
    return cleanup(r.body.response);
  } catch (e) {
    throw new Error(e.message);
  }
};

async function cleanup(raw) {
  return await raw.sentences.reduce((flat, sentence) => {
    const args = sentence.words
      .reduce((args, word, i) => {
        const rel = word.relationToParent;

        // good for REGISTER
        if (word.partOfSpeech === 'VBD') {
          return args.concat(word.token);
        }
        if (rel === 'dobj') {
          return args.concat([
            sentence.words[word.parentPosition].token,
            word.token
          ]);
        }

        if (rel === 'acomp') {
          return args.concat([
            sentence.words[word.parentPosition].token,
            word.token
          ]);
        }

        // below are good for FOOD
        if (rel === 'pobj') {
          return args.concat(word.token);
        }

        if (rel === 'prep') {
          return args.concat(sentence.words[i + 1].token);
        }

        if (rel === 'conj') {
          return args.concat([
            sentence.words[word.parentPosition].token,
            word.token
          ]);
        }

        if (rel === 'nn') {
          return args.concat(word.token);
        }

        return args;
      }, [])
      .filter(el => el !== '.' && el !== '?' && el !== '!' && el !== ',')
      .filter((el, pos, arr) => arr.indexOf(el) === pos); // dedupe
    return flat.concat(args);
  }, []);
}
