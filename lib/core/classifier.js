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

const decoyPhrases = [
  'Behind the complex concert smokes the opened ear.',
  'The wound goldfish ditches the packet into a dismissed salary.',
  'The superfluous ax hurts.',
  'How does the sharing sentence boggle with the constituent?',
  'How can the singing matter blackmail the constrained insect?'
];

const bayes = require('bayes')();

weatherPhrases.map(phrase => {
  bayes.learn(phrase, 'weather');
});

registerPhrases.map(phrase => {
  bayes.learn(phrase, 'progress-register');
});

presentationPhrases.map(phrase => {
  bayes.learn(phrase, 'progress-presentation');
});

decoyPhrases.map(phrase => {
  bayes.learn(phrase, 'unknown');
});

module.exports = rawText => new Promise(resolve => {
  resolve(bayes.categorize(rawText));
});

// const request = require('request');

// const TEXTRAZOR_ENDPOINT = 'https://api.textrazor.com';
// const { TEXTRAZOR_KEY } = process.env;

// module.exports = rawText => new Promise((resolve, reject) => {
//   request(
//     {
//       method  : 'POST',
//       url     : TEXTRAZOR_ENDPOINT,
//       gzip    : true,
//       headers : {
//         'X-TextRazor-Key' : TEXTRAZOR_KEY,
//         'Accept-encoding' : 'gzip'
//       },
//       form: {
//         text        : rawText,
//         classifiers : 'textrazor_mediatopics'
//       }
//     },
//     (err, res, body) => {
//       if (err) {
//         reject(err.message);
//       } else {
//         resolve(judge(JSON.parse(body).response.categories));
//       }
//     }
//   );
// });

// function judge(categories) {
//   const cats = categories.filter(cat => cat.score > 0.1)
//   .map(cat => cat.label);
//   return format(cats);
// }

// function format(categories) {
//   const formattedCats = categories.reduce((acc, cat) => {
//     const str = cat.split('>');
//     return acc.concat(str);
//   }, []);
//   return formattedCats;
// }
