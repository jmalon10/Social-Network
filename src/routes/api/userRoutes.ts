import { Router } from 'express';
import User from '../../models/User';  // Adjust to your User model location

export const userRouter = Router();

// GET all users
userRouter.get('/', async (_req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single user by ID
userRouter.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user
userRouter.post('/', async (req, res) => {
  try {
    const user = new User(req.body);  // Assuming req.body contains valid user data
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a user by ID
userRouter.put('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a user by ID
userRouter.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add a friend (add friend by userId)
userRouter.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) return res.status(404).json({ message: 'User or Friend not found' });

    // Add friend
    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      await user.save();
      res.json(user);
    } else {
      res.status(400).json({ message: 'Already friends' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE remove a friend
userRouter.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const index = user.friends.indexOf(req.params.friendId);
    if (index === -1) return res.status(400).json({ message: 'Friend not found' });

    user.friends.splice(index, 1);  // Remove friend
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
