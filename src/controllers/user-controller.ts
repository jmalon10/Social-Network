// UserControllers.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';

const ObjectId = mongoose.Types.ObjectId;

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  
};

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted' });
};

export const addFriend = async (req: Request, res: Response) => {
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
};

export const removeFriend = async (req: Request, res: Response) => {
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
};

