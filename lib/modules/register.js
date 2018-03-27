const moment = require('moment');

// const cheating = {
//   6  : [{ keyword: 'ate vegitarian', rest: ['']}],
//   10 : [
//     { keyword: 'recycled', rest: ['cans']},
//     { keyword: 'rode bike', rest: ['work']}
//   ]
// };

module.exports = async (action, args) => {
  // console.log(args);
  if (!args[0]) {
    action.tell('I can\'t understand what you\'ve done.');
  } else {
    // console.log(action);
    register(args, action);
    const response = await register(args, action);
    console.log(response);
    action.tell(response);
  }
};

async function register (args, action) {
  const week = moment().week();
  // console.log(args, week, action.userStorage);
  // console.log(action);
  // console.log(action.userStorage);
  if (!action.userStorage.progress) {
    // console.log('no progress');
    const prog = { [week]: args };
    action.userStorage.progress = prog;
  }
  // console.log(action.userStorage);
  return 'Noted!';
  // if (!action.userStorage) {
  //   // first time
  //   // make progress obj & register task
  //   console.log(action.userStorage);
  //   // action.userStorage.progress = {
  //   //   [week]: [...args]
  //   // };
  //   // humanize args
  //   // const word = isKeyword(args) || '';
  //   // congratulate on good choice
  //   return `Noted! Keep it up!`;
  // } else if (!action.userStorage[week]) {
  //   // first time this week
  //   // get time since last
  //   // longer = more praise (?)
  //   // const diff =
  //   //   week -
  //   //   Object.keys(action.userStorage)[
  //   //     Object.keys(action.userStorage).length - 1
  //   //   ];
  // } else {
  //   // has done several this week
  //   // get points
  //   // more = more praise
  // }
}

// function isKeyword (args) {
//   // split and see if keyword and stuff
//   const words = args.reduce((acc, cur) => {
//     const separated = cur.split(' ');
//     return acc.concat(separated);
//   }, []);
// }
