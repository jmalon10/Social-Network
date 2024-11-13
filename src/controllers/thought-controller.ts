// ThoughtControllers.ts
import { Request, Response } from 'express';
import Thought from '../models/Thought.js';

export const getAllThoughts = async (_: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts); // Add return
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' }); // Add return
    }
    return res.json(thought); // Add return
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = new Thought(req.body);
    await thought.save();
    return res.status(201).json(thought); // Add return
  } catch (err) {
    return res.status(400).json({ message: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' }); // Add return
    }
    return res.json(thought); // Add return
  } catch (err) {
    return res.status(400).json({ message: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' }); // Add return
    }
    return res.json({ message: 'Thought deleted' }); // Add return
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' }); // Add return
    }
    thought.reactions.push(req.body);
    await thought.save();
    return res.json(thought); // Add return
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};

export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' }); // Add return
    }
    const reactionIndex = thought.reactions.findIndex(
      (reaction: any) => reaction._id.toString() === req.params.reactionId
    );
    if (reactionIndex === -1) {
      return res.status(404).json({ message: 'Reaction not found' }); // Add return
    }
    thought.reactions.splice(reactionIndex, 1);
    await thought.save();
    return res.json(thought); // Add return
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : 'An unexpected error occurred' });
  }
};
