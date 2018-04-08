const moment = require('moment');

const realDeal = async action => {
  const progress = action.userStorage.prog;
  const activeWeeks = Object.keys(progress).map(w => Number(w));
  const currentWeek = moment().isoWeek();

  // check if lazy user tries to trick us
  if (activeWeeks.length === 0) {
    action.tell('You\'ve made zero progress... Ever.');
  } else if (activeWeeks.length === 1) {
    // !must check if new year!

    // single week - check if current
    if (activeWeeks[0] === currentWeek) {
      // first active week
      const score = await weeklyScore(progress[activeWeeks[0]], true);

      // depending on pace, give appropriate encouragement
      action.tell(
        `first active week - score: ${score.score}. pace: ${score.pace}`
      );
    } else {
      // get weeks since last active
      const lastActive = activeWeeks.reduce(
        (last, week) => (week > last ? week : last),
        0
      );
      const weeksSinceLast = currentWeek - lastActive;
      const patience = 4; // threshold for how long we even bother...

      if (weeksSinceLast > patience) {
        // sassy response
        action.tell(
          `active ${weeksSinceLast} weeks ago - patience: ${weeksSinceLast <
            patience}`
        );
      } else {
        // score it, plead and beg for their return
        const score = await weeklyScore(progress[activeWeeks[0]]);
        action.tell(
          `active ${weeksSinceLast} weeks ago - patience: ${weeksSinceLast <
            patience}. score and pace: ${score.score}, ${score.pace}`
        );
      }
    }
  } else if (activeWeeks.includes(currentWeek)) {
    // multiple weeks incl. current
    // score current
    const currentScore = await weeklyScore(progress[currentWeek], true);

    // get last active
    const lastActive = activeWeeks.reduce(
      (last, week) => (week > last && week !== currentWeek ? week : last),
      0
    );
    const lastScore = await weeklyScore(progress[lastActive]);

    action.tell(
      `multiple weeks incl. current - current: [score, pace: ${
        currentScore.score
      }, ${currentScore.pace}]. last: [score, pace: ${lastScore.score}, ${
        lastScore.pace
      }]`
    );
  } else {
    // multiple weeks excl. current
    const lastTwo = getLatestWeeks(progress);
    const latestScore = await weeklyScore(progress[lastTwo[0]]);
    const baseline = await weeklyScore(progress[lastTwo[1]]);

    action.tell(
      `multiple weeks EXCLUDING current - week ${lastTwo[0]}: [score, pace: ${
        latestScore.score
      }, ${latestScore.pace}]. week ${lastTwo[1]}: [score, pace: ${
        baseline.score
      }, ${baseline.pace}]`
    );
  }
};

// {
//   includesCurrent: boolean,
//   weeks: [int, int]
// }

// [{score: int, pace: int}, {score: int, pace: int}]

module.exports = async action => {
  const latestActiveWeeks = await getLatestWeeks(action.userStorage.prog);
  console.log(scoreWeeks(latestActiveWeeks));

  action.tell('f');
};

function getLatestWeeks(progress) {
  // get the two latest weeks
  const indices = Object.keys(progress)
    .map(w => Number(w))
    .reduce((top, week) => {
      if (top.length < 2) {
        return week > Math.max(...top) ?
          [week, Math.max(...top)] :
          [Math.max(...top), week];
      }
      if (week > top[0] || week > top[1]) {
        return week > Math.max(...top) ?
          [week, Math.max(...top)] :
          [Math.max(...top), week];
      }

      return top;
    }, []);

  return indices;
}

function scoreWeeks(weeks, isCurrent) {
  return weeks.map(w => {
    const pace = isCurrent ? w.length - moment().isoWeekday() : w.length - 7;
    const score = pace > 0 ? pace : 0;
    return {
      pace,
      score
    };
  });
}

async function weeklyScore(weeklyProgress, isCurrent) {
  const pace = isCurrent ?
    weeklyProgress.length - moment().isoWeekday() :
    weeklyProgress.length - 7;
  const score = pace > 0 ? pace : 0;
  return {
    pace,
    score
  };
}

// async function compareScores(baseline, challenger) {

// }
// async function weeklySpread(week) {

// }
// async function compareSpreads(baseline, challenger) {

// }

// async function assembleReponse() {}
