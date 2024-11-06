import mongoose from 'mongoose';
import { User, Thought } from '../models/index.js';
import { users, thoughts } from './data.js';

const dbUrl = 'mongodb://localhost:27017/Social';

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect(dbUrl)
    .then(() => {
      console.log('Database connected successfully!');
      // Your seeding logic here
    })
    .catch(err => {
      console.error('Database connection error:', err);
    });

    console.log('Connected to MongoDB.');

    // Clear the collections
    await User.deleteMany({});
    await Thought.deleteMany({});

    console.log('Cleared existing data.');

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`Inserted ${createdUsers.length} users.`);

    // Link thoughts to users and insert thoughts
    const thoughtsWithUserIds = thoughts.map((thought, index) => ({
      ...thought,
      userId: createdUsers[index % createdUsers.length]._id,
    }));
    
    const createdThoughts = await Thought.insertMany(thoughtsWithUserIds);
    console.log(`Inserted ${createdThoughts.length} thoughts.`);

    // Link thoughts to users
    await Promise.all(
      createdUsers.map((user, index) => {
        return User.findByIdAndUpdate(user._id, {
          $push: { thoughts: createdThoughts[index % createdThoughts.length]._id },
        });
      })
    );

    console.log('Seed data successfully added.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedDatabase();
