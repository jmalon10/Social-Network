import { Router } from 'express';
import Thought from '../../models/Thought';  // Adjust to your Thought model location

export const thoughtRouter = Router();

// GET all thoughts
thoughtRouter.get('/', async (_req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single thought by ID
thoughtRouter.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new thought
thoughtRouter.post('/', async (req, res) => {
  try {
    const thought = new Thought(req.body);  // Assuming req.body contains valid thought data
    await thought.save();
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a thought by ID
thoughtRouter.put('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a thought by ID
thoughtRouter.delete('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add a reaction to a thought
thoughtRouter.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    // Add reaction
    thought.reactions.push(req.body);  // Assuming req.body contains valid reaction data
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE remove a reaction from a thought
thoughtRouter.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });

    const reactionIndex = thought.reactions.findIndex(reaction => reaction._id.toString() === req.params.reactionId);
    if (reactionIndex === -1) return res.status(400).json({ message: 'Reaction not found' });

    thought.reactions.splice(reactionIndex, 1);  // Remove reaction
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
