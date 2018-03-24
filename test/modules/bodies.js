module.exports.weather = {
  user: {
    userId      : 'tester',
    locale      : 'en-US',
    lastSeen    : '2018-03-22T08:46:30Z',
    userStorage : '{"data":{"location":"London"}}'
  },
  conversation: {
    conversationId    : '1521708396321',
    type              : 'ACTIVE',
    conversationToken : '{"state":null,"data":{}}'
  },
  inputs: [
    {
      intent    : 'actions.intent.TEXT',
      rawInputs : [
        {
          inputType : 'VOICE',
          query     : 'what\'s the weather going to be like this afternoon?'
        }
      ],
      arguments: [
        {
          name      : 'text',
          rawText   : 'what\'s the weather going to be like this afternoon?',
          textValue : 'what\'s the weather going to be like this afternoon?'
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
  isInSandbox       : true,
  availableSurfaces : [
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
    userId      : 'tester',
    locale      : 'en-US',
    lastSeen    : '2018-03-22T08:46:50Z',
    userStorage : '{"data":{"location":"Umeå"}}'
  },
  conversation: {
    conversationId    : '1521708470563',
    type              : 'ACTIVE',
    conversationToken : '{"state":null,"data":{}}'
  },
  inputs: [
    {
      intent    : 'actions.intent.TEXT',
      rawInputs : [
        {
          inputType : 'VOICE',
          query     : 'i recycled six cans and some plastic today'
        }
      ],
      arguments: [
        {
          name      : 'text',
          rawText   : 'i recycled six cans and some plastic today',
          textValue : 'i recycled six cans and some plastic today'
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
  isInSandbox       : true,
  availableSurfaces : [
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
