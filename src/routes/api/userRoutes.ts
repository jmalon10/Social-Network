import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../../models/User.js';

const userRouter = Router();
const ObjectId = mongoose.Types.ObjectId;

// GET all users
userRouter.get('/', async (_, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// GET a single user by ID
userRouter.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// POST a new user
userRouter.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// PUT to update a user by ID
userRouter.put('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// DELETE a user by ID
userRouter.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted' });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// POST to add a friend
userRouter.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }
    if (!user.friends.includes(friend._id as mongoose.Types.ObjectId)) {
      user.friends.push(friend._id as mongoose.Types.ObjectId);
      await user.save();
      return res.json(user);
    } else {
      return res.status(400).json({ message: 'Already friends' });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// DELETE to remove a friend
userRouter.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const friendId = new ObjectId(req.params.friendId);
    const index = user.friends.indexOf(friendId);
    if (index === -1) {
      return res.status(400).json({ message: 'Friend not found' });
    }
    user.friends.splice(index, 1);
    await user.save();
    return res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

export { userRouter };


