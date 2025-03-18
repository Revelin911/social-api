import { Router } from 'express';
const router = Router();
import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThoughts, } from '../../../controllers/thoughtController';
// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThoughts);
//   // /api/users/:userId/thoughts
// router
// .route('/:userId/thoughts')
// .post(addThought);
// // /api/users/:userId/thoughts/:thoughtId
// router
// .route('/:userId/thoughts/:thoughtId')
// .delete(removeThought);
export { router as ThoughtRouter };
