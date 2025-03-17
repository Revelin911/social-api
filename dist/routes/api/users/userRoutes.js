import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, createUser, deleteUser, addThought, removeThought, } from '../../../controllers/userController';
// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
// /api/users/:userId/friends/:friendId
router
    .route('/:userId')
    .get(getUserById)
    .delete(deleteUser);
// /api/users/:userId/thoughts
router
    .route('/:userId/thoughts')
    .post(addThought);
// /api/users/:userId/thoughts/:thoughtId
router
    .route('/:userId/thoughts/:thoughtId')
    .delete(removeThought);
export { router as UserRouter };
