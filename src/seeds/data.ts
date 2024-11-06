import { Types } from 'mongoose';

export const users = [
  {
    _id: new Types.ObjectId(),
    username: 'user1',
    email: 'user1@example.com',
    friends: [],
    thoughts: []
  },
  {
    _id: new Types.ObjectId(),
    username: 'user2',
    email: 'user2@example.com',
    friends: [],
    thoughts: []
  },
  {
    _id: new Types.ObjectId(),
    username: 'user3',
    email: 'user3@example.com',
    friends: [],
    thoughts: []
  },
  {
    _id: new Types.ObjectId(),
    username: 'user4',
    email: 'user4@example.com',
    friends: [],
    thoughts: []
  },
  {
    _id: new Types.ObjectId(),
    username: 'user5',
    email: 'user5@example.com',
    friends: [],
    thoughts: []
  },
];

export const thoughts = [
  {
    thoughtText: 'This is a thought from user1!',
    username: 'user1',
    createdAt: new Date(),
    reactions: [
      {
        reactionBody: 'Nice thought!',
        username: 'user2',
        createdAt: new Date(),
      }
    ]
  },
  {
    thoughtText: 'Another interesting thought from user2!',
    username: 'user2',
    createdAt: new Date(),
    reactions: [
      {
        reactionBody: 'I agree with you!',
        username: 'user1',
        createdAt: new Date(),
      }, 
      {
        reactionBody: 'I DONT agree with you!',
        username: 'user3',
        createdAt: new Date(),
      }
    ]
  },
  {
    thoughtText: 'I want to share a thought and i am user3!',
    username: 'user3',
    createdAt: new Date(),
    reactions: [
      {
        reactionBody: 'I think you are right!',
        username: 'user1',
        createdAt: new Date(),
      },
      {
        reactionBody: 'i vibe with this!',
        username: 'user4',
        createdAt: new Date(),
      }
    ]
  },
  {
    thoughtText: 'How do i share thoughts on this thing?',
    username: 'user5',
    createdAt: new Date(),
    reactions: [
      {
        reactionBody: 'I think you Just did!',
        username: 'user1',
        createdAt: new Date(),
      },
      {
        reactionBody: 'I had the same trouble!',
        username: 'user6',
        createdAt: new Date(),
      }
    ]
  },
  {
    thoughtText: 'Us old folks are not good with technology! love the confusion @user5!',    
    username: 'user6',
    createdAt: new Date(),
    reactions: [
      {
        reactionBody: 'Hi grandpa!',
        username: 'user4',
        createdAt: new Date(),
      },
      {
        reactionBody: 'haha glad im not the only one!',
        username: 'user5',
        createdAt: new Date(),
      }
    ]
  },
];
