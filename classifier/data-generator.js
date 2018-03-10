const fs = require('fs');
const got = require('got');
const express = require('express');
const uniqueRandomArray = require('unique-random-array'); //eslint-disable-line

const app = express();
app.use(express.json());
app.listen(process.env.PORT);

const { food, present, register, weather } = require('./seed');

const TEXTRAZOR_ENDPOINT = 'https://api.textrazor.com/';
const { TEXTRAZOR_KEY } = process.env;

(async () => {
  console.log('Generating data...');
  const t = await tokens();
  // console.log(t);
  const p = await phrases(t, 100);
  const d = {
    food: {
      phrases : food.concat(p.foodPhrases),
      tokens  : t.foodTok
    },
    present: {
      phrases : present.concat(p.presentPhrases),
      tokens  : t.presentTok
    },
    register: {
      phrases : register.concat(p.registerPhrases),
      tokens  : t.registerTok
    },
    weather: {
      phrases : weather.concat(p.weatherPhrases),
      tokens  : t.weatherTok
    }
  };

  // save to file
  fs.writeFile('./training-data.json', JSON.stringify(d, null, 2), err => {
    if (err) throw new Error(err.message);
    console.log('New training data saved to File!');
  });

  // exit
  // process.exit(0);
})();

async function phrases(tokens, n) {
  console.log('Making phrases...');
  const foodPhrases = await genPhrases(tokens.foodTok, n);
  console.log('Got 1 / 4');
  const presentPhrases = await genPhrases(tokens.presentTok, n);
  console.log('Got 2 / 4');
  const registerPhrases = await genPhrases(tokens.registerTok, n);
  console.log('Got 3 / 4');
  const weatherPhrases = await genPhrases(tokens.weatherTok, n);
  console.log('Got 4 / 4');
  console.log(foodPhrases.length);

  return { foodPhrases, presentPhrases, registerPhrases, weatherPhrases };
}

async function genPhrases(t, n) {
  const rw = uniqueRandomArray(t);
  const threes = new Array(n).fill(0)
    .map(() => `${ rw() } ${ rw() } ${ rw() }`);
  const fours = new Array(n)
    .fill(0)
    .map(() => `${ rw() } ${ rw() } ${ rw() } ${ rw() }`);
  const fives = new Array(n)
    .fill(0)
    .map(() => `${ rw() } ${ rw() } ${ rw() } ${ rw() } ${ rw() }`);
  const sixes = new Array(n)
    .fill(0)
    .map(() => `${ rw() } ${ rw() } ${ rw() } ${ rw() } ${ rw() } ${ rw() }`);
  const sevens = new Array(n)
    .fill(0)
    .map(() => `${ rw() } ${ rw() } ${ rw() } ${ rw() } ${ rw() } ${ rw() } ${ rw() }`);

  return threes.concat(fours, fives, sixes, sevens);
}

async function tokens() {
  console.log('Tokenizing...');
  const foodTok = clean(await entailments(food));
  console.log('Got 1 / 4');
  const presentTok = clean(await entailments(present));
  console.log('Got 2 / 4');
  const registerTok = clean(await entailments(register));
  console.log('Got 3 / 4');
  const weatherTok = clean(await entailments(weather));
  console.log('Got 4 / 4');
  return { foodTok, presentTok, registerTok, weatherTok };
}

async function entailments(phrases) {
  const payload = merge(phrases);

  try {
    const r = await got(TEXTRAZOR_ENDPOINT, {
      method  : 'post',
      json    : true,
      form    : true,
      timeout : 10000,
      headers : {
        'Accept-encoding' : 'gzip',
        'X-TextRazor-Key' : TEXTRAZOR_KEY
      },
      body: {
        extractors : 'entailments',
        text       : payload
      }
    });
    return r.body.response.entailments;
  } catch (e) {
    throw new Error(e.message);
  }
}

function merge(phrases) {
  return phrases.reduce((acc, cur) => {
    return acc.concat(cur, ' ');
  }, '');
}

function clean(ents) {
  return ents.reduce((acc, ent) => {
    if (ent.score > 0.4) {
      return acc.concat(ent.entailedWords);
    }
    return acc;
  }, []);
}
