const moment = require('moment');

const KNOWN_TASKS = ['recycle'];

module.exports = async (action, args) => {
  const prog = action.userStorage.prog;
  const currentWeek = moment().isoWeek();

  // parse args
  const taskObj = parseArgs(args, currentWeek);

  // check state of stored progress
  if (Object.keys(prog.active).length === 0) {
    // no active - just plonk in right in there
    register(action, taskObj);
  } else if (prog.active.week === currentWeek) {
    // current week is already active - first merge
    const newTask = {
      week: prog.active.week,
      tasks: prog.active.tasks.concat(taskObj.tasks),
      keywords: prog.active.keywords.concat(taskObj.keywords)
    };
    // then replace active
    register(action, newTask);
  } else {
    // active week is old - archive it
    register(action, taskObj, archiveWeek(prog.active));
  }

  const speech = taskObj.tasks.join(', ');
  action.tell(`${speech.charAt(0).toUpperCase() + speech.slice(1)}, got it!`);
};

function register(action, taskObj, toArchive) {
  if (toArchive) {
    action.userStorage.prog.archive = toArchive
      .concat(action.userStorage.prog.archive)
      .sort((a, b) => b.week - a.week);
  }

  action.userStorage.prog.active = addPrevLink(
    action.userStorage.prog.archive,
    taskObj
  );
}

function addPrevLink(archive, newItem) {
  return Object.assign(newItem, {prev: archive[0] ? archive[0].week : null});
}

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

function archiveWeek(finishedWeek) {
  const {week, tasks, keywords} = finishedWeek;

  return [].concat({
    week,
    noOfTasks: tasks.length,
    topTasks: getTops(keywords)
  });
}

function getTops(keys) {
  const THRESHOLD = 3;

  // key must appear atleast three times to qualify
  if (keys.length < THRESHOLD) {
    return [];
  }

  return keys.reduce((acc, cur, i, keys) => {
    if (acc.some(el => el.task === cur)) {
      return acc;
    }
    const n = keys.filter(k => k === cur).length;
    return n >= THRESHOLD ?
      acc.concat({count: n, task: cur}).sort((a, b) => b.count - a.count) :
      acc;
  }, []);
}
