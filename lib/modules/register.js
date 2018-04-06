const moment = require('moment');

module.exports = async (action, args) => {
  const w = moment().isoWeek();
  if (args.length === 0) {
    if (!action.userStorage.prog[w]) {
      action.userStorage.prog[w] = ['Likely heroic deed'];
    } else {
      action.userStorage.prog[w].push('Likely heroic deed');
    }
    action.tell('One good deed registered!');
  } else {
    const str = args.map(arg => arg.tok).join(' ');
    const corrected = str.charAt(0).toUpperCase() + str.slice(1);

    if (!action.userStorage.prog[w]) {
      action.userStorage.prog[w] = [corrected];
    } else {
      action.userStorage.prog[w].push(corrected);
    }

    action.tell(`${ corrected }, got it!`);
  }
};
