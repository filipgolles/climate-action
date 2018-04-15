const moment = require('moment');

const KNOWN_TASKS = ['recycle', 'bike'];

module.exports = async (action, args) => {
  const performance = action.userStorage.performance;
  console.log(JSON.stringify(performance, null, 2));
  const currentWeek = moment().isoWeek();

  // parse args
  const behaviorObj = parseArgs(args, currentWeek);

  // check state of stored performance
  if (Object.keys(performance.active).length === 0) {
    // no active - just plonk in right in there
    register(action, behaviorObj);
  } else if (performance.active.week === currentWeek) {
    // current week is already active - first merge
    const newTask = {
      week: performance.active.week,
      tasks: performance.active.tasks.concat(behaviorObj.tasks),
      keywords: performance.active.keywords.concat(behaviorObj.keywords)
    };
    // then replace active
    register(action, newTask);
  } else {
    // active week is old - archive it
    register(action, behaviorObj, performance.active);
  }

  const speech = behaviorObj.tasks.join(', ');
  action.tell(`${speech.charAt(0).toUpperCase() + speech.slice(1)}, got it!`);
};

function register(action, behaviorObj, toArchive) {
  if (toArchive) {
    action.userStorage.performance.archive = []
      .concat(toArchive, action.userStorage.performance.archive)
      .sort((a, b) => b.week - a.week);
  }

  action.userStorage.performance.active = behaviorObj;
}

// function addPrevLink(archive, newItem) {
//   return Object.assign(newItem, {prev: archive[0] ? archive[0].week : null});
// }

function parseArgs(args, week) {
  const tasks = [].concat(
    args.length > 0 ? args.map(arg => arg.tok).join(' ') : 'unknown'
  );

  // check for known words.
  const keywords = [].concat(
    args.reduce((kws, arg) => {
      return KNOWN_TASKS.includes(arg.lem) || KNOWN_TASKS.includes(arg.tok) ?
        kws.concat(arg.lem) :
        kws;
    }, [])
  );

  return {
    week,
    tasks,
    keywords
  };
}

// function archiveWeek(finishedWeek) {
//   const {week, tasks, keywords} = finishedWeek;

//   return [].concat(finishedWeek);
// }

// function getTops(keys) {
//   const THRESHOLD = 3;

//   // key must appear atleast three times to qualify
//   if (keys.length < THRESHOLD) {
//     return [];
//   }

//   return keys.reduce((acc, cur, i, keys) => {
//     if (acc.some(el => el.task === cur)) {
//       return acc;
//     }
//     const n = keys.filter(k => k === cur).length;
//     return n >= THRESHOLD ?
//       acc.concat({count: n, task: cur}).sort((a, b) => b.count - a.count) :
//       acc;
//   }, []);
// }
