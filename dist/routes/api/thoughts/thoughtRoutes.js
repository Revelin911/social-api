import { Router } from 'express';
const router = Router();
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, } from '../../../controllers/thoughtController';
// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
export { router as ThoughtRouter };
