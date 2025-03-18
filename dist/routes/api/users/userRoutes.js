import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, createUser, deleteUser, addFriend, removeFriends, } from '../../../controllers/userController';
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
// /api/users/:userId/friends
router
    .route('/:userId/friends')
    .post(addFriend);
// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .delete(removeFriends);
export { router as UserRouter };
