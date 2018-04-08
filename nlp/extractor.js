const got = require('got');

const {TRAZOR_KEY, TRAZOR_ENDPOINT} = process.env;

const EXCL_RELATIONS = ['tmod', 'det', 'num', 'poss', 'punct'];
const EXCL_PARTS = ['TO', 'VB', 'PRP', 'DT', 'IN'];
const LINK_RELATIONS = ['amod', 'pobj'];
const LINK_AVOID = ['NNS'];

module.exports.extract = async function (str) {
  try {
    const r = await got(TRAZOR_ENDPOINT, {
      method: 'post',
      form: true,
      json: true,
      headers: {
        'X-TextRazor-Key': TRAZOR_KEY,
        'Accept-encoding': 'gzip'
      },
      body: {
        extractors: 'entities,relations',
        text: str
      }
    });
    return extract(r.body.response);
  } catch (err) {
    console.error(err);
  }
};

async function extract({sentences, entities, relations, properties} = {}) {
  // We want the root
  // and any entities found by TextRazor,
  // all words making up the Object of the sentence(s),
  // and any 'properties', ('is-a', 'has-a' relationship between predicate and focus)

  const words = sentences.reduce((acc, cur) => acc.concat(cur.words), []);

  const indices = [].concat(
    words.filter(w => !w.relationToParent).map(w => w.position),
    entities ?
      entities.reduce((acc, cur) => acc.concat(cur.matchingTokens), []) :
      [],
    relations ?
      relations
        .reduce((acc, cur) => acc.concat(cur.params), [])
        .filter(r => r.relation === 'OBJECT')
        .reduce((acc, cur) => acc.concat(cur.wordPositions), []) :
      [],
    properties ?
      properties.reduce((acc, cur) => {
        return acc.concat(cur.wordPositions.concat(cur.propertyPositions));
      }, []) :
      []
  );

  return matchWords(words, indices);
}

function matchWords(words, indices) {
  return words
    .reduce((acc, cur) => {
      if (indices.includes(cur.position) && isSignificant(cur)) {
        const word = cleanup(cur);

        // Get friend if word has link
        if (word.lnk !== null) {
          const friend = cleanup(words.find(w => w.position === word.lnk));
          return acc.concat(
            friend.pos > word.pos ? [word, friend] : [friend, word]
          );
        }

        return acc.concat(word);
      }
      return acc;
    }, [])
    .filter((cur, i, arr) => {
      return i === arr.findIndex(el => el.pos === cur.pos);
    });
}

function isSignificant({relationToParent, partOfSpeech} = {}) {
  return (
    !EXCL_RELATIONS.includes(relationToParent) &&
    !EXCL_PARTS.includes(partOfSpeech)
  );
}

function cleanup({
  relationToParent,
  parentPosition,
  token,
  lemma,
  position,
  partOfSpeech
} = {}) {
  return {
    pos: position,
    tok: token,
    lem: lemma,
    tag: partOfSpeech,
    lnk:
      LINK_RELATIONS.includes(relationToParent) &&
        !LINK_AVOID.includes(partOfSpeech) ?
        parentPosition :
        null
  };
}
