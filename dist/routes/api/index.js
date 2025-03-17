import { Router } from 'express';
import { ThoughtRouter } from './thoughts/thoughtRoutes';
import { UserRouter } from './users/userRoutes';
const router = Router();
router.use('/thoughts', ThoughtRouter);
router.use('/users', UserRouter);
export default router;
