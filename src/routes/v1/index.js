import express from 'express';

import authRoute from './auth.route.js';
import studentsRoute from './student.route.js';
import staffRoute from './staff.route.js';
import ticketRoute from './ticket.route.js';
import ticketCommentRoute from './ticketcomment.route.js';
import ticketCategoryRoute from './ticketcategory.route.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/auth/confirm', authRoute);
router.use('/student', studentsRoute);
router.use('/students', studentsRoute);
router.use('/staff', staffRoute);
router.use('/ticket/category', ticketCategoryRoute);
router.use('/ticket/categories', ticketCategoryRoute);
router.use('/ticket/comment', ticketCommentRoute);
router.use('/ticket/comments', ticketCommentRoute);
router.use('/ticket', ticketRoute);
router.use('/tickets', ticketRoute);
export default router;
