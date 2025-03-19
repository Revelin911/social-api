import { Router } from 'express';
import { ThoughtRouter } from './thoughts/thoughtRoutes.js';
import { UserRouter } from './users/userRoutes.js';

const router = Router();

router.use('/thoughts', ThoughtRouter);
router.use('/users', UserRouter);

export default router;
