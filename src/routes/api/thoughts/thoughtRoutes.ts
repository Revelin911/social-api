import { Router } from 'express';
const router = Router();
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../../controllers/courseController.js';

// /api/thoughts
router.route('/').get(getAllCourses).post(createCourse);

// /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId')
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

export { router as courseRouter };
