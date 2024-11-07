import { Router } from 'express';
import Thought from '../../models/Thought.js';

const thoughtRouter = Router();

// GET all thoughts
thoughtRouter.get('/', async (_, res) => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// GET a single thought by ID
thoughtRouter.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// POST a new thought
thoughtRouter.post('/', async (req, res) => {
  try {
    const thought = new Thought(req.body);
    await thought.save();
    return res.status(201).json(thought);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// PUT to update a thought by ID
thoughtRouter.put('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// DELETE a thought by ID
thoughtRouter.delete('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json({ message: 'Thought deleted' });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// POST a reaction to a thought
thoughtRouter.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    return res.json(thought);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

// DELETE a reaction from a thought
thoughtRouter.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    const reactionIndex = thought.reactions.findIndex(
      (reaction: any) => reaction._id.toString() === req.params.reactionId
    );
    if (reactionIndex === -1) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    thought.reactions.splice(reactionIndex, 1);
    await thought.save();
    return res.json(thought);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

export { thoughtRouter };
