export type KudosProgram = {
  "version": "0.1.0",
  "name": "kudos_program",
  "instructions": [
    {
      "name": "createUserStats",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "pdaBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "giveKudos",
      "accounts": [
        {
          "name": "kudosSender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "kudosReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "senderStats",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "kudosReceived",
            "type": "u64"
          },
          {
            "name": "kudosGiven",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

export const IDL: KudosProgram = {
  "version": "0.1.0",
  "name": "kudos_program",
  "instructions": [
    {
      "name": "createUserStats",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "pdaBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "giveKudos",
      "accounts": [
        {
          "name": "kudosSender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "kudosReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverStats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "senderStats",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "kudosReceived",
            "type": "u64"
          },
          {
            "name": "kudosGiven",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
