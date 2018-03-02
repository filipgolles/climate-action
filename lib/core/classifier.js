const request = require('request');

const TEXTRAZOR_ENDPOINT = 'https://api.textrazor.com';
const { TEXTRAZOR_KEY } = process.env;

module.exports = rawText => new Promise((resolve, reject) => {
  request(
    {
      method  : 'POST',
      url     : TEXTRAZOR_ENDPOINT,
      gzip    : true,
      headers : {
        'X-TextRazor-Key' : TEXTRAZOR_KEY,
        'Accept-encoding' : 'gzip'
      },
      form: {
        text        : rawText,
        classifiers : 'textrazor_mediatopics'
      }
    },
    (err, res, body) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(judge(JSON.parse(body).response.categories));
      }
    }
  );
});

function judge(categories) {
  const cats = categories.filter(cat => cat.score > 0.1).map(cat => cat.label);
  return format(cats);
}

function format(categories) {
  const formattedCats = categories.reduce((acc, cat) => {
    const str = cat.split('>');
    return acc.concat(str);
  }, []);
  return formattedCats;
}
