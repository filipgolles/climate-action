const prog = {
  active: {
    week: 15,
    tasks: ['recycled tins', 'recycled tins', 'unknown'],
    keywords: ['recycle', 'recycle'],
    prev: 9
  },
  archive: [
    {
      week: 12,
      noOfTasks: 3,
      topTasks: [
        {
          count: 2,
          task: 'recycle'
        }
      ]
    }
  ]
};

const moment = require('moment');

// only care about results less than PATIENCE weeks old
const PATIENCE = 4;
const isCurrent = (cw, weekObj) => weekObj.week === cw;
const hasPatience = (base, subtract) => base - subtract < PATIENCE;
const hasPrevious = weekObj => weekObj.prev !== null;

module.exports = async action => {
  const prog = action.userStorage.prog;

  // do checks if exists and blablabla new year blabla
  const response = await getResponse(prog);
  action.tell(response);
};

function getResponse({active, archive} = {}) {
  const cw = moment().isoWeek();

  // do current-check when scoring
  if (hasPatience(cw, active.week)) {
    if (hasPrevious(active)) {
      if (hasPatience(active.week, active.prev)) {
        return assembleMulti(
          cw,
          active,
          archive.find(w => w.week === active.prev)
        );
      }
    }
    return assembleSingle(cw, active);
  }
  return assembleFallback(cw, active);
}

function assembleSingle(cw, activeWeek) {
  const wd = moment().isoWeekday() - 1;
  const score = scoreWeek(cw, wd, activeWeek);

  const resParts = {
    pre: '',
    body: '',
    post: ''
  };

  // different response current
  if (score.pace) {
    resParts.pre = `Your are`;
    resParts.body =
      score.pace > 0 ?
        'doing really good!' :
        'taking it a little slow this week.';

    resParts.post =
      score.pace > 0 ? 'Keep it up!' : 'There\'s still time to improve though!.';
  } else {
    resParts.pre = `Your latest registered score were`;
    resParts.body = score.points > 10 ? 'really good!' : 'okay!';
    resParts.post = 'You should pick it up again!';
  }

  return `${Object.values(resParts).join(' ')}`;
}

function assembleMulti(cw, activeWeek, previousWeek) {
  const wd = moment().isoWeekday() - 1;
  const activeScore = scoreWeek(cw, wd, activeWeek);
  const previousScore = scoreWeek(cw, wd, previousWeek);
  const diff = activeScore.points - previousScore.points;

  const resParts = {
    pre: '',
    body: '',
    post: ''
  };

  // different response if active is current
  if (activeScore.pace) {
    resParts.pre = `Your current score is`;

    if (diff > 0) {
      resParts.body = 'higher than your previous!';
      resParts.post =
        activeScore.pace > 0 ?
          'You will break some kind of record if you keep this up!' :
          'Don\'t lose your steam!';
    } else if (diff === 0) {
      resParts.body = 'on par the with the previous one.';
      resParts.post =
        activeScore.pace > 0 ?
          'You might beat it if you keep this tempo up!' :
          'Don\'t lose your steam!';
    } else {
      resParts.body = 'not quite as high as your last.';
      resParts.post =
        activeScore.pace > 0 ?
          'Keep this tempo up though, and that may change!' :
          'Don\'t lose your steam!';
    }
  } else {
    resParts.pre = `Your last registered scores were`;
    resParts.body =
      diff > 0 ?
        'getting higher and higher!' :
        diff === 0 ? 'stagnating a bit.' : 'dropping a little.';
    resParts.post =
      diff > 0 ?
        'You should pick it up again!' :
        'Now is a great time to correct that!';
  }
  return `${Object.values(resParts).join(' ')}`;
}

function assembleFallback(cw, activeWeek) {
  return 'fallback - active: ' + activeWeek.week;
}

function scoreWeek(cw, wd, weekObj) {
  const noOfRegs = weekObj.noOfTasks ? weekObj.noOfTasks : weekObj.tasks.length;
  const noOfKeys = weekObj.keywords ?
    weekObj.keywords.length :
    weekObj.topTasks.reduce((tot, key) => {
      return tot + key.count;
    }, 0);

  // one point for regular task, 2 for keyword
  const regPoints = noOfRegs - noOfKeys;
  const keyPoints = noOfKeys * 2;

  return isCurrent(cw, weekObj) ?
    Object.assign(
      {points: regPoints + keyPoints},
      {pace: weekObj.tasks.length - wd}
    ) :
    {points: noOfRegs + noOfKeys};
}
