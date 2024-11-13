// thoughtRoutes.ts
import { Router } from 'express';
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} from '../../controllers/thought-controller.js';

const thoughtRouter = Router();

// Routes and corresponding controller functions
thoughtRouter.get('/', getAllThoughts);
thoughtRouter.get('/:thoughtId', getThoughtById);
thoughtRouter.post('/', createThought);
thoughtRouter.put('/:thoughtId', updateThought);
thoughtRouter.delete('/:thoughtId', deleteThought);
thoughtRouter.post('/:thoughtId/reactions', addReaction);
thoughtRouter.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

export { thoughtRouter };

