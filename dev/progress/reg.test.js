const register = require('../../lib/modules/register');

const actionCurActive = {
  userStorage: {
    prog: {
      active: {
        week: 15,
        tasks: ['recycled tins'],
        keywords: ['recycle'],
        prev: 11
      },
      archive: [
        {
          week: 11,
          noOfTasks: 4,
          topTasks: [
            {
              count: 4,
              task: 'recycle'
            }
          ]
        }
      ]
    }
  },
  tell(str) {
    this.res = str;
  }
};

const actionCurActive2 = {
  userStorage: {
    prog: {
      active: {
        week: 15,
        tasks: ['recycled tins', 'recycled cans'],
        keywords: ['recycle', 'recycle'],
        prev: 11
      },
      archive: [
        {
          week: 11,
          noOfTasks: 4,
          topTasks: [
            {
              count: 4,
              task: 'recycle'
            }
          ]
        }
      ]
    }
  },
  tell(str) {
    this.res = str;
  }
};

const actionPrevActive = {
  userStorage: {
    prog: {
      active: {
        week: 13,
        tasks: [
          'recycled tins',
          'recycled tins',
          'scared lady',
          'recycled cans'
        ],
        keywords: [
          'recycle',
          'recycle',
          'recycle',
          'recycle',
          'poop',
          'yes',
          'yes'
        ],
        prev: 10
        // keywords: ['recycle', 'scare', 'war', 'g', 'a']
      },
      archive: [
        {
          week: 10,
          noOfTasks: 4,
          topTasks: [
            {
              count: 4,
              task: 'recycle'
            }
          ]
        },
        {
          week: 11,
          noOfTasks: 4,
          topTasks: [
            {
              count: 4,
              task: 'recycle'
            }
          ]
        }
      ]
    }
  },
  tell(str) {
    this.res = str;
  }
};

const actionFirst = {
  userStorage: {
    prog: {
      active: {},
      archive: []
    }
  },
  tell(str) {
    this.res = str;
  }
};

const args = [
  {pos: 1, tok: 'recycled', lem: 'recycle', tag: 'VBD', lnk: null},
  {pos: 3, tok: 'cans', lem: 'can', tag: 'NNS', lnk: null}
];

// console.log(
//   'userStorage.prog before: ',
//   JSON.stringify(actionFirst.userStorage.prog, null, 2)
// );
// console.log('args: ', args);
// register(actionFirst, args);
// console.log('response: ', actionFirst.res);
// console.log(
//   'userStorage.prog after: ',
//   JSON.stringify(actionFirst.userStorage.prog.active, null, 2)
// );

// console.log(
//   'userStorage.prog before: ',
//   JSON.stringify(actionCurActive.userStorage.prog, null, 2)
// );
// console.log('args: ', args);
// register(actionCurActive, args);
// console.log('response: ', actionCurActive.res);
// console.log(
//   'userStorage.prog after: ',
//   JSON.stringify(actionCurActive.userStorage.prog, null, 2)
// );

// console.log(
//   'userStorage.prog before: ',
//   JSON.stringify(actionCurActive2.userStorage.prog, null, 2)
// );
// console.log('args: ', args);
// register(actionCurActive2, args);
// console.log('response: ', actionCurActive2.res);
// console.log(
//   'userStorage.prog after: ',
//   JSON.stringify(actionCurActive2.userStorage.prog.active, null, 2)
// );

console.log(
  'userStorage.prog before: ',
  JSON.stringify(actionPrevActive.userStorage.prog, null, 2)
);
console.log('args: ', args);
register(actionPrevActive, args);
console.log('response: ', actionPrevActive.res);
console.log(
  'userStorage.prog after: ',
  JSON.stringify(actionPrevActive.userStorage.prog, null, 2)
);
