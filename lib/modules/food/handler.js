// const request = require('request'); // change to got
const got = require('got');

const { F2F_KEY, F2F_SEARCH_ENDPOINT, F2F_GET_ENDPOINT } = process.env;

module.exports = async (action, args) => {
  console.log(`handled by food. args: ${ await args }`);
  action.ask('food food food...');
};

function exec() {}

// module.exports.cheat = str => {
//   request(
//     {
//       url  : F2F_SEARCH_ENDPOINT,
//       json : true,
//       qs   : {
//         key : F2F_KEY,
//         q   : str
//       }
//     },
//     (e, res, body) => {
//       if (e) {
//         throw new Error(e.message);
//       } else {
//         console.log(res.statusCode);
//         console.log(body.recipes[2]);
//         getRecipe(body.recipes[2].recipe_id);
//       }
//     }
//   );
// };

// function getRecipe(id) {
//   request(
//     {
//       url  : F2F_GET_ENDPOINT,
//       json : true,
//       qs   : {
//         key : F2F_KEY,
//         rId : id
//       }
//     },
//     (e, res, body) => {
//       if (e) {
//         throw new Error(e.message);
//       } else {
//         console.log(res.statusCode);
//         console.log(body);
//       }
//     }
//   );
// }

// module.exports.cheatEDAM = str => {
//   console.log('fire req to recipe');
//   request(
//     {
//       url     : EDAMAM_ENDPOINT,
//       gzip    : true,
//       json    : true,
//       headers : {
//         'Accept-encoding': 'gzip'
//       },
//       qs: {
//         app_id  : EDAMAM_RECIPE_ID,
//         app_key : EDAMAM_RECIPE_KEY,
//         q       : str,
//         from    : 0,
//         to      : 4
//       }
//     },
//     (e, res, body) => {
//       if (e) {
//         throw new Error(e.message);
//       } else {
//         // console.log(JSON.stringify(body, null, 2));
//         console.log(res.statusCode);
//         // console.log(body);
//         console.log(body['hits'][0].recipe);
//       }
//     }
//   );
// };
