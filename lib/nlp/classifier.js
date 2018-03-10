// const request = require('request');
// const { BayesClassifier } = require('natural');

// const bayes = new BayesClassifier();

// const weatherPhrases = [
//   'tell me about the weather',
//   'what will the weather be like',
//   'give me the weather forecast for today',
//   'is it raining outside',
//   'how cold is it'
// ];

// const registerPhrases = [
//   'i recycled today',
//   'me and some work friends are starting a car pool',
//   'ate vegitarian today',
//   'i rode my bicycle to work',
//   'bought a season ticket for the bus'
// ];

// const presentationPhrases = [
//   'how am i doing',
//   'am i doing better than last week',
//   'tell me about my progress',
//   'how climate friendly have i been',
//   'am i doing worse than before'
// ];

// const recipePhrases = [
//   'tell me the recipe for spaghetti',
//   'how do i cook nestles',
//   'recipe for iced tea please',
//   'how long to boil eggs',
//   'stir fry recipe'
// // ];

// weatherPhrases.map(phrase => {
//   // bayes.addDocument(phrase, 'weather');
//   // lrc.addDocument(phrase, 'weather');
// });

// registerPhrases.map(phrase => {
//   // bayes.addDocument(phrase, 'progress-register');
//   // lrc.addDocument(phrase, 'progress-register');
// });

// presentationPhrases.map(phrase => {
//   // bayes.addDocument(phrase, 'progress-presentation');
//   // lrc.addDocument(phrase, 'progress-presentation');
// });

// recipePhrases.map(phrase => {
//   // bayes.addDocument(phrase, 'recipe');
//   // lrc.addDocument(phrase, 'recipe');
// });

// bayes.train();
// lrc.train();
// console.log('trained');

// SE TILL ATT SPARA DET HÄR!!!

// const extract = async rawText => {
//   const processed = await analyze(rawText);

//   console.log('===================================================');
//   console.log(JSON.stringify(processed, null, 2));

//   if (processed) {
//     if (processed.entities) {
//       // entities are the best
//       return processed.entities
//         .reduce((args, ent) => args.concat(ent.matchedText, ' '), '')
//         .trim();
//     } else if (processed.properties) {
//       // properties are also cool
//       const words = rawText.split(' ');
//       const props = processed.properties[processed.properties.length - 1];
//       return props.propertyPositions
//         .reduce((args, prop) => args.concat(words[prop], ' '), '')
//         .trim();
//     } else if (processed.sentences) {
//       // else just get the nouns...
//       const words = processed.sentences.reduce(
//         (words, sentence) => words.concat(sentence.words),
//         []
//       );
//       const nouns = words.reduce((nns, word) => {
//         if (word.partOfSpeech === 'NN') {
//           return nns.concat(word.token, ' ');
//         }
//         return nns;
//       }, '');
//       return nouns;
//     }

//     return null;
//   }
// };

// module.exports = async rawText => {
//   // const classes = bayes.getClassifications(rawText);
//   // const lclasses = lrc.getClassifications(rawText);
//   console.log(`===== ${ rawText } =====`);
//   console.log(classes);
//   // console.log('- - - - - - - - - - - - - -');
//   // console.log(lclasses);
//   if (classes[0].value <= classes[1].value) {
//     return null;
//   }
//   const event = {
//     args  : await extract(rawText),
//     label : classes[0].label
//   };

//   return event;
// };
