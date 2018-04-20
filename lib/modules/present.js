// const perf = {
//   active: {
//     week: 16,
//     tasks: ['recycled tins', 'recycled tins', 'unknown'],
//     keywords: ['recycle', 'recycle', 'recycle'],
//     prev: 12
//   },
//   archive: [
//     {
//     week: 14,
//     tasks: ['recycled tins', 'recycled tins', 'unknown'],
//     keywords: ['recycle', 'recycle', 'recycle'],
//     prev: 12
//   },{
//     week: 11,
//     tasks: ['recycled tins', 'recycled tins', 'unknown'],
//     keywords: ['recycle', 'recycle', 'recycle'],
//     prev: 12
//   }
//   ]
// };

const moment = require('moment');

module.exports = async action => {
  const performance = action.userStorage.performance;
  console.log(performance);

  if (performance.archive.length > 0) {
    // compare last week to last-last week
    const latestScore = await score(performance.active);
    const previousScore = await score(performance.archive[0]);

    action.tell(
      latestScore > previousScore ?
        `Your performance has improved! You've saved ${latestScore -
            previousScore} barrels of oil more than last time!` :
        `Your performance has declined a bit. You've saved ${previousScore -
            latestScore} barrels of oil less than usual...`
    );
  } else if (performance.active.week) {
    // compare last week to day of week
    const latestScore = await score(performance.active);

    if (performance.active.week === moment().isoWeek()) {
      action.tell(
        latestScore > moment().isoWeekday() ?
          `Looking good so far! You've saved ${latestScore *
              100} kilowatt hours in ${moment().isoWeekday()} days!` :
          `Not looking that good right now. Only ${latestScore *
              100} kilowatt hours saved to far...`
      );
    } else {
      action.tell(
        latestScore > 7 ?
          `Your last performance ${moment().isoWeek() -
              performance.active
                .week} weeks ago was pretty good. ${latestScore} barrels of oil saved!` :
          `Your last performance ${moment().isoWeek() -
              performance.active
                .week} weeks ago wasn't that great... Just ${latestScore *
              100} kilowatt hours saved in a week.`
      );
    }
  } else {
    action.tell(`You'll have to register some behaviors first.`);
  }
};

async function score(week) {
  return week.tasks.length + week.keywords.length;
}

// async function getVerdict(performance) {
//   const currentWeek = await score(performance.active);

//   if (performance.archive.length > 0) {
//     const previousWeek = await score(performance.archive[0]);
//     const daysLeft = 7 - moment().isoWeekday();

//     if (currentWeek > previousWeek - daysLeft) {
//       return {
//         cur: 'improved since last time! Keep it up!',
//         prev: 'improving. Why quit when you\'re on top?'
//       };
//     }

//     return {
//       cur: 'declined since last time. Sad.',
//       prev: 'declining. Better recycle something real quick to redeem yourself.'
//     };
//   }
//   return null;
// }

// async function score(week) {
//   const performed = week.tasks ? week.tasks.length : week.noOfTasks;
//   const bonus = week.keywords ?
//     week.keywords.length :
//     week.topTasks.reduce((acc, cur) => acc + cur.count, 0);

//   return performed + bonus;
// }

// module.exports = async action => {
//   const prog = action.userStorage.prog;
//   debug(JSON.stringify(prog, null, 2));

//   action.tell('placeholding');

//   // do checks if exists and blablabla new year blabla
//   const response = await getResponse(prog);
//   action.tell(response);
// };

// only care about results less than PATIENCE weeks old
// const PATIENCE = 4;
// const isCurrent = (cw, weekObj) => weekObj.week === cw;
// const hasPatience = (base, subtract) => base - subtract < PATIENCE;
// const hasPrevious = weekObj => weekObj.prev !== null;

// function getResponse({active, archive} = {}) {
//   const cw = moment().isoWeek();

//   // do current-check when scoring
//   if (hasPatience(cw, active.week)) {
//     if (hasPrevious(active)) {
//       if (hasPatience(active.week, active.prev)) {
//         return assembleMulti(
//           cw,
//           active,
//           archive.find(w => w.week === active.prev)
//         );
//       }
//     }
//     return assembleSingle(cw, active);
//   }
//   return assembleFallback(cw, active);
// }

// function assembleSingle(cw, activeWeek) {
//   const wd = moment().isoWeekday() - 1;
//   const score = scoreWeek(cw, wd, activeWeek);

//   const resParts = {
//     pre: '',
//     body: '',
//     post: ''
//   };

//   // different response current
//   if (score.pace) {
//     resParts.pre = `Your are`;
//     resParts.body =
//       score.pace > 0 ?
//         'doing really good!' :
//         'taking it a little slow this week.';

//     resParts.post =
//       score.pace > 0 ? 'Keep it up!' : 'There\'s still time to improve though!.';
//   } else {
//     resParts.pre = `Your latest registered score were`;
//     resParts.body = score.points > 10 ? 'really good!' : 'okay!';
//     resParts.post = 'You should pick it up again!';
//   }

//   return `${Object.values(resParts).join(' ')}`;
// }

// function assembleMulti(cw, activeWeek, previousWeek) {
//   const wd = moment().isoWeekday() - 1;
//   const activeScore = scoreWeek(cw, wd, activeWeek);
//   const previousScore = scoreWeek(cw, wd, previousWeek);
//   const diff = activeScore.points - previousScore.points;

//   const resParts = {
//     pre: '',
//     body: '',
//     post: ''
//   };

//   // different response if active is current
//   if (activeScore.pace) {
//     resParts.pre = `Your current score is`;

//     if (diff > 0) {
//       resParts.body = 'higher than your previous!';
//       resParts.post =
//         activeScore.pace > 0 ?
//           'You will break some kind of record if you keep this up!' :
//           'Don\'t lose your steam!';
//     } else if (diff === 0) {
//       resParts.body = 'on par the with the previous one.';
//       resParts.post =
//         activeScore.pace > 0 ?
//           'You might beat it if you keep this tempo up!' :
//           'Don\'t lose your steam!';
//     } else {
//       resParts.body = 'not quite as high as your last.';
//       resParts.post =
//         activeScore.pace > 0 ?
//           'Keep this tempo up though, and that may change!' :
//           'Don\'t lose your steam!';
//     }
//   } else {
//     resParts.pre = `Your last registered scores were`;
//     resParts.body =
//       diff > 0 ?
//         'getting higher and higher!' :
//         diff === 0 ?
//           'stagnating a bit.' :
//           'dropping a little.';
//     resParts.post =
//       diff > 0 ?
//         'You should pick it up again!' :
//         'Now is a great time to correct that!';
//   }
//   return `${Object.values(resParts).join(' ')}`;
// }

// function assembleFallback(cw, activeWeek) {
//   return 'fallback - active: ' + activeWeek.week;
// }

// function scoreWeek(cw, wd, weekObj) {
//   const noOfRegs = weekObj.noOfTasks ? weekObj.noOfTasks : weekObj.tasks.length;
//   const noOfKeys = weekObj.keywords ?
//     weekObj.keywords.length :
//     weekObj.topTasks.reduce((tot, key) => {
//       return tot + key.count;
//     }, 0);

//   // one point for regular task, 2 for keyword
//   const regPoints = noOfRegs - noOfKeys;
//   const keyPoints = noOfKeys * 2;

//   return isCurrent(cw, weekObj) ?
//     Object.assign(
//       {points: regPoints + keyPoints},
//       {pace: weekObj.tasks.length - wd}
//     ) :
//     {points: noOfRegs + noOfKeys};
// }
