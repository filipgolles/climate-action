// TextRazor
const qs = require('querystring');
const axios = require('axios');

const TEXTRAZOR_ENDPOINT = 'https://api.textrazor.com/';
const { TEXTRAZOR_KEY } = process.env;

module.exports = async rawText => {
  return await axios({
    data: qs.stringify({
      classifiers : 'textrazor_iab,textrazor_mediatopics',
      // cool extractors : 'words,relations,entities,entailments,senses,phrases',
      extractors  : 'words,relations,phrases',
      text        : rawText
    }),
    headers: {
      'Accept-encoding' : 'gzip',
      'Content-Type'    : 'application/x-www-form-urlencoded',
      'X-TextRazor-Key' : TEXTRAZOR_KEY
    },
    method       : 'post',
    responseType : 'json',
    url          : TEXTRAZOR_ENDPOINT
  })
    .then(res => {
      return res.data.response;
    })
    .catch(e => {
      throw new Error(e.message);
    });
};
