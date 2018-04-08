module.exports.weatherLoc = {
  user: {
    userId: 'tester',
    locale: 'en-US',
    lastSeen: '2018-03-22T08:46:30Z',
    userStorage: '{"data":{"prog":[],"location":"London"}}'
  },
  conversation: {
    conversationId: '1521708396321',
    type: 'ACTIVE',
    conversationToken: '{"state":null,"data":{}}'
  },
  inputs: [
    {
      intent: 'actions.intent.TEXT',
      rawInputs: [
        {
          inputType: 'VOICE',
          query: 'what\'s the weather going to be like this afternoon?'
        }
      ],
      arguments: [
        {
          name: 'text',
          rawText: 'what\'s the weather going to be like this afternoon?',
          textValue: 'what\'s the weather going to be like this afternoon?'
        }
      ]
    }
  ],
  surface: {
    capabilities: [
      {
        name: 'actions.capability.AUDIO_OUTPUT'
      },
      {
        name: 'actions.capability.MEDIA_RESPONSE_AUDIO'
      }
    ]
  },
  isInSandbox: true,
  availableSurfaces: [
    {
      capabilities: [
        {
          name: 'actions.capability.AUDIO_OUTPUT'
        },
        {
          name: 'actions.capability.SCREEN_OUTPUT'
        }
      ]
    }
  ]
};

module.exports.weatherNoLoc = {
  user: {
    userId: 'tester',
    locale: 'en-US',
    lastSeen: '2018-03-22T08:46:30Z',
    userStorage: '{"data":{"prog":[],"location":null}}'
  },
  conversation: {
    conversationId: '1521708396321',
    type: 'ACTIVE',
    conversationToken: '{"state":null,"data":{}}'
  },
  inputs: [
    {
      intent: 'actions.intent.TEXT',
      rawInputs: [
        {
          inputType: 'VOICE',
          query: 'what\'s the weather going to be like this afternoon?'
        }
      ],
      arguments: [
        {
          name: 'text',
          rawText: 'what\'s the weather going to be like this afternoon?',
          textValue: 'what\'s the weather going to be like this afternoon?'
        }
      ]
    }
  ],
  surface: {
    capabilities: [
      {
        name: 'actions.capability.AUDIO_OUTPUT'
      },
      {
        name: 'actions.capability.MEDIA_RESPONSE_AUDIO'
      }
    ]
  },
  isInSandbox: true,
  availableSurfaces: [
    {
      capabilities: [
        {
          name: 'actions.capability.AUDIO_OUTPUT'
        },
        {
          name: 'actions.capability.SCREEN_OUTPUT'
        }
      ]
    }
  ]
};

module.exports.register = {
  user: {
    userId: 'tester',
    locale: 'en-US',
    lastSeen: '2018-03-22T08:46:50Z',
    userStorage: '{"data":{"location":"Umeå"}}'
  },
  conversation: {
    conversationId: '1521708470563',
    type: 'ACTIVE',
    conversationToken: '{"state":null,"data":{}}'
  },
  inputs: [
    {
      intent: 'actions.intent.TEXT',
      rawInputs: [
        {
          inputType: 'VOICE',
          query: 'i recycled six cans and plastic'
        }
      ],
      arguments: [
        {
          name: 'text',
          rawText: 'i recycled six cans and plastic',
          textValue: 'i recycled six cans and plastic'
        }
      ]
    }
  ],
  surface: {
    capabilities: [
      {
        name: 'actions.capability.AUDIO_OUTPUT'
      },
      {
        name: 'actions.capability.MEDIA_RESPONSE_AUDIO'
      }
    ]
  },
  isInSandbox: true,
  availableSurfaces: [
    {
      capabilities: [
        {
          name: 'actions.capability.SCREEN_OUTPUT'
        },
        {
          name: 'actions.capability.AUDIO_OUTPUT'
        }
      ]
    }
  ]
};

// Works: userStorage: '{"data":{"prog":{},"location":null}}'
module.exports.pres = {
  user: {
    userId:
      'ABwppHHdMDYs8EhsNJoYs0mW6iRPhl7IqDuGWnHzgrmoQo_o1wqSYllnP-avfnket8gI5w_yBT2RpnOLBDLrccIXF0OG',
    locale: 'en-US',
    lastSeen: '2018-04-06T09:36:23Z'
    // userStorage: null
  },
  conversation: {
    conversationId: '1523007411610',
    type: 'ACTIVE',
    conversationToken: '{"state":null,"data":{}}'
  },
  inputs: [
    {
      intent: 'actions.intent.TEXT',
      rawInputs: [
        {
          inputType: 'KEYBOARD',
          query: 'what\'s my progress'
        }
      ],
      arguments: [
        {
          name: 'text',
          rawText: 'what\'s my progress',
          textValue: 'what\'s my progress'
        }
      ]
    }
  ],
  surface: {
    capabilities: [
      {
        name: 'actions.capability.SCREEN_OUTPUT'
      },
      {
        name: 'actions.capability.MEDIA_RESPONSE_AUDIO'
      },
      {
        name: 'actions.capability.WEB_BROWSER'
      },
      {
        name: 'actions.capability.AUDIO_OUTPUT'
      }
    ]
  },
  isInSandbox: true,
  availableSurfaces: [
    {
      capabilities: [
        {
          name: 'actions.capability.SCREEN_OUTPUT'
        },
        {
          name: 'actions.capability.AUDIO_OUTPUT'
        }
      ]
    }
  ]
};

// Module.exports.presentCur = {
//   user: {
//     userId:
//       'ABwppHHdMDYs8EhsNJoYs0mW6iRPhl7IqDuGWnHzgrmoQo_o1wqSYllnP-avfnket8gI5w_yBT2RpnOLBDLrccIXF0OG',
//     locale: 'en-US',
//     lastSeen: '2018-04-06T09:36:23Z',
//     userStorage:
//       '{"data":{"prog":{"14":["Left car at home","Recycled cans"]},"location":null}}'
//   },
//   conversation: {
//     conversationId: '1523007411610',
//     type: 'ACTIVE',
//     conversationToken: '{"state":null,"data":{}}'
//   },
//   inputs: [
//     {
//       intent: 'actions.intent.TEXT',
//       rawInputs: [
//         {
//           inputType: 'KEYBOARD',
//           query: 'what\'s my progress'
//         }
//       ],
//       arguments: [
//         {
//           name: 'text',
//           rawText: 'what\'s my progress',
//           textValue: 'what\'s my progress'
//         }
//       ]
//     }
//   ],
//   surface: {
//     capabilities: [
//       {
//         name: 'actions.capability.SCREEN_OUTPUT'
//       },
//       {
//         name: 'actions.capability.MEDIA_RESPONSE_AUDIO'
//       },
//       {
//         name: 'actions.capability.WEB_BROWSER'
//       },
//       {
//         name: 'actions.capability.AUDIO_OUTPUT'
//       }
//     ]
//   },
//   isInSandbox: true,
//   availableSurfaces: [
//     {
//       capabilities: [
//         {
//           name: 'actions.capability.SCREEN_OUTPUT'
//         },
//         {
//           name: 'actions.capability.AUDIO_OUTPUT'
//         }
//       ]
//     }
//   ]
// };
// module.exports.presentPrev = {
//   user: {
//     userId:
//       'ABwppHHdMDYs8EhsNJoYs0mW6iRPhl7IqDuGWnHzgrmoQo_o1wqSYllnP-avfnket8gI5w_yBT2RpnOLBDLrccIXF0OG',
//     locale: 'en-US',
//     lastSeen: '2018-04-06T09:36:23Z',
//     userStorage:
//       '{"data":{"prog":{"11":["Left car at home","Recycled cans"]},"location":null}}'
//   },
//   conversation: {
//     conversationId: '1523007411610',
//     type: 'ACTIVE',
//     conversationToken: '{"state":null,"data":{}}'
//   },
//   inputs: [
//     {
//       intent: 'actions.intent.TEXT',
//       rawInputs: [
//         {
//           inputType: 'KEYBOARD',
//           query: 'what\'s my progress'
//         }
//       ],
//       arguments: [
//         {
//           name: 'text',
//           rawText: 'what\'s my progress',
//           textValue: 'what\'s my progress'
//         }
//       ]
//     }
//   ],
//   surface: {
//     capabilities: [
//       {
//         name: 'actions.capability.SCREEN_OUTPUT'
//       },
//       {
//         name: 'actions.capability.MEDIA_RESPONSE_AUDIO'
//       },
//       {
//         name: 'actions.capability.WEB_BROWSER'
//       },
//       {
//         name: 'actions.capability.AUDIO_OUTPUT'
//       }
//     ]
//   },
//   isInSandbox: true,
//   availableSurfaces: [
//     {
//       capabilities: [
//         {
//           name: 'actions.capability.SCREEN_OUTPUT'
//         },
//         {
//           name: 'actions.capability.AUDIO_OUTPUT'
//         }
//       ]
//     }
//   ]
// };
// module.exports.presentCurAndLast = {
//   user: {
//     userId:
//       'ABwppHHdMDYs8EhsNJoYs0mW6iRPhl7IqDuGWnHzgrmoQo_o1wqSYllnP-avfnket8gI5w_yBT2RpnOLBDLrccIXF0OG',
//     locale: 'en-US',
//     lastSeen: '2018-04-06T09:36:23Z',
//     userStorage:
//       '{"data":{"prog":{"14":["Left car at home","Recycled cans"], "13":["Recycled cans"]},"location":null}}'
//   },
//   conversation: {
//     conversationId: '1523007411610',
//     type: 'ACTIVE',
//     conversationToken: '{"state":null,"data":{}}'
//   },
//   inputs: [
//     {
//       intent: 'actions.intent.TEXT',
//       rawInputs: [
//         {
//           inputType: 'KEYBOARD',
//           query: 'what\'s my progress'
//         }
//       ],
//       arguments: [
//         {
//           name: 'text',
//           rawText: 'what\'s my progress',
//           textValue: 'what\'s my progress'
//         }
//       ]
//     }
//   ],
//   surface: {
//     capabilities: [
//       {
//         name: 'actions.capability.SCREEN_OUTPUT'
//       },
//       {
//         name: 'actions.capability.MEDIA_RESPONSE_AUDIO'
//       },
//       {
//         name: 'actions.capability.WEB_BROWSER'
//       },
//       {
//         name: 'actions.capability.AUDIO_OUTPUT'
//       }
//     ]
//   },
//   isInSandbox: true,
//   availableSurfaces: [
//     {
//       capabilities: [
//         {
//           name: 'actions.capability.SCREEN_OUTPUT'
//         },
//         {
//           name: 'actions.capability.AUDIO_OUTPUT'
//         }
//       ]
//     }
//   ]
// };
// module.exports.presentCurAndPrev = {
//   user: {
//     userId:
//       'ABwppHHdMDYs8EhsNJoYs0mW6iRPhl7IqDuGWnHzgrmoQo_o1wqSYllnP-avfnket8gI5w_yBT2RpnOLBDLrccIXF0OG',
//     locale: 'en-US',
//     lastSeen: '2018-04-06T09:36:23Z',
//     userStorage:
//       '{"data":{"prog":{"14":["Left car at home","Recycled cans"], "10":["Recycled cans"]},"location":null}}'
//   },
//   conversation: {
//     conversationId: '1523007411610',
//     type: 'ACTIVE',
//     conversationToken: '{"state":null,"data":{}}'
//   },
//   inputs: [
//     {
//       intent: 'actions.intent.TEXT',
//       rawInputs: [
//         {
//           inputType: 'KEYBOARD',
//           query: 'what\'s my progress'
//         }
//       ],
//       arguments: [
//         {
//           name: 'text',
//           rawText: 'what\'s my progress',
//           textValue: 'what\'s my progress'
//         }
//       ]
//     }
//   ],
//   surface: {
//     capabilities: [
//       {
//         name: 'actions.capability.SCREEN_OUTPUT'
//       },
//       {
//         name: 'actions.capability.MEDIA_RESPONSE_AUDIO'
//       },
//       {
//         name: 'actions.capability.WEB_BROWSER'
//       },
//       {
//         name: 'actions.capability.AUDIO_OUTPUT'
//       }
//     ]
//   },
//   isInSandbox: true,
//   availableSurfaces: [
//     {
//       capabilities: [
//         {
//           name: 'actions.capability.SCREEN_OUTPUT'
//         },
//         {
//           name: 'actions.capability.AUDIO_OUTPUT'
//         }
//       ]
//     }
//   ]
// };
