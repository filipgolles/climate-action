// const req = require('supertest');
// const {pres} = require('../bodies');
// const server = require('../../lib/core/webhook');

// async function fireReq(str) {
//   const body = await Object.assign({}, pres, {user: Object.assign({userStorage: str}, pres.user)});
//   return req(server)
//     .post('/hook')
//     .send(body).then(r => {
//       // console.log(r.body);
//       // console.log('--- --- SUCCESSFUL --- ---');
//       console.log('\n');
//     });
// }

// (async () => {
//   // console.log('\n');
//   // console.log('=== NONE - [] ===');
//   // await fireReq('{"data":{"prog":{},"location":null}}');

//   console.log('=== CUR - [ week 14 : 2 tasks ] ===');
//   await fireReq('{"data":{"prog":{"14":["Left car at home","Recycled cans"]},"location":null}}');

//   console.log('=== CUR - [ week 14 : 7 tasks ] ===');
//   await fireReq('{"data":{"prog":{"14":["Left car at home","Recycled cans","Recycled cans","Recycled cans","Recycled cans","Recycled cans","Recycled cans"]},"location":null}}');

//   console.log('=== PREV - [ week 11 : 2 tasks ] ===');
//   await fireReq('{"data":{"prog":{"11":["Left car at home","Recycled cans"]},"location":null}}');

//   console.log('=== PREV - [ week 7 : 2 tasks ] ===');
//   await fireReq('{"data":{"prog":{"7":["Left car at home","Recycled cans"]},"location":null}}');

//   console.log('=== CUR & LAST - [ week 14 : 2 tasks ] [ week 13 : 1 task ] ===');
//   await fireReq('{"data":{"prog":{"14":["Left car at home","Recycled cans"], "13":["Recycled cans"]},"location":null}}');

//   console.log('=== CUR & PREV - [ week 14 : 2 tasks ] [ week 10 : 1 task ] ===');
//   await fireReq('{"data":{"prog":{"14":["Left car at home","Recycled cans"], "10":["Recycled cans"]},"location":null}}');

//   console.log('=== MULTI, NO CUR - [ week 12 : 11 tasks ] [ week 11, 9, 8 : 1 task ] ===');
//   await fireReq('{"data":{"prog":{"12":["tskr", "tskr", "tskr", "tskr", "tskr", "tskr", "tskr", "tskr", "tskr", "tskr", "tskr"], "11":["Recycled cans"], "9":["Recycled cans"], "8":["Recycled cans"]},"location":null}}');

//   server.close();
// })();
