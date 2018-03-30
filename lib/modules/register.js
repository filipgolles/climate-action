const moment = require('moment');

module.exports = async (action, args) => {
  console.log(action.userStorage.prog.length);
  if (args.length === 0) {
    action.tell('One good deed registered!');
  } else {
    action.userStorage.prog.push({
      week : moment().isoWeek(),
      day  : moment().isoWeekday(),
      args
    });
    console.log(action.userStorage);
    const str = args.map(arg => arg.tok).join(' ');
    action.tell(`${ str.charAt(0).toUpperCase() + str.slice(1) }, got it!`);
  }
};
