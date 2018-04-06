const moment = require('moment');

module.exports = async action => {
  // do some kinda check (dialogState-thing) if first time,
  // or if user opted in to detailed response

  const progress = action.userStorage.prog;
  const w = moment().isoWeek();
  const activeWeeks = Object.keys(progress).map(k => Number(k));

  if (activeWeeks.length > 0) {
    const timeline = getTimeline(activeWeeks, w, progress);

    const str = prepareJudgement(timeline);

    action.ask(`${ str } Would you like to know more?`, {
      context    : 'present',
      isFollowUp : true
    });
  } else {
    action.tell('You\'ve made zero progress... Ever.');
  }
};

function prepareJudgement (timeline) {
  const weekday = moment().isoWeekday();

  if (timeline[0] !== null) {
    if (timeline[1] !== null) {
      const tilt = timeline[0].tasks.length - timeline[1].tasks.length;
      return ``;
    }

    // first week, be nice
    const deficit = weekday - timeline[0].tasks.length;
    console.log('deficit: ', deficit);

    // TODO: fix this horrible HORRIBLE thing
    return `${
      deficit < 1 ? 'Impressive numbers!' : 'Not bad for a first timer!'
    }`;
  } else if (timeline[1] !== null) {
    // none this week, but prev
    return ``;
  }
}

function assembleSimpleResponse () {
  // just if results are better or worse than last active week
}

function assembleDetailedResponse () {
  // comparison of types of tasks etc.
}

function getTimeline (activeWeeks, w, progress) {
  if (activeWeeks.includes(w)) {
    return activeWeeks.length > 1
      ? [
        { week: w, tasks: progress[w] },
        {
          week  : Math.max(...activeWeeks.filter(el => el !== w)),
          tasks : progress[Math.max(...activeWeeks.filter(el => el !== w))]
        }
      ]
      : [{ week: w, tasks: progress[w] }, null ];
  }
  return [
    null,
    {
      week  : Math.max(...activeWeeks.filter(el => el !== w)),
      tasks : progress[Math.max(...activeWeeks.filter(el => el !== w))]
    }
  ];
}
