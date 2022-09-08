import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  getStudents, postStudent, getStudentByID, patchStudentByID,
} from '../../controllers/student.controller.js';
import { isStaff } from '../../middlewares/index.js';
import { addStudentSchema } from '../../validations/students-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           description: The Student Member's ID.
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         email:
 *           type: string
 *           description: The Student's email.
 *           example: hello@example.com
 *         phoneNumber:
 *           type: string
 *           description: The Student's Phone Number.
 *           example: 123-456-7890
 *         firstName:
 *           type: string
 *           description: The Student's First Name.
 *           example: Steve
 *         lastName:
 *           type: string
 *           description: The Student's Last Name.
 *           example: Jobs
 *         building:
 *           type: string
 *           description: The Student's Assigned Building.
 *           example: Building A1
 *         room:
 *           type: string
 *           description: The Student's Assigned Room.
 *           example: Room A321
 *         bed:
 *           type: string
 *           description: The Student's Assigned Bed.
 *           example: Bed 3
 *         active:
 *           type: boolean
 *           description: The Student's Active status.
 *           example: true
 *     StudentRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The Student's email.
 *           example: hello@example.com
 *         phoneNumber:
 *           type: string
 *           description: The Student's Phone Number.
 *           example: 123-456-7890
 *         firstName:
 *           type: string
 *           description: The Student's First Name.
 *           example: Steve
 *         lastName:
 *           type: string
 *           description: The Student's Last Name.
 *           example: Jobs
 *         building:
 *           type: string
 *           description: The Student's Assigned Building.
 *           example: Building A1
 *         room:
 *           type: string
 *           description: The Student's Assigned Room.
 *           example: Room A321
 *         bed:
 *           type: string
 *           description: The Student's Assigned Bed.
 *           example: Bed 3
 *         active:
 *           type: boolean
 *           description: The Student's Active status.
 *           example: true
 *
 *     GetStudentRequest:
 *       type: object
 *       properties:
 *         studentID:
 *             type: string
 *             description: The Student Member's ID.
 *             example: 123e4567-e89b-12d3-a456-426655440000
 *     CreateStudentRequest:
 *       allOf:
 *       - $ref: '#/components/schemas/StudentRequest'
 *       - type: object
 *
 *     CreateStudentSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         data:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Student'
 */

/**
 * @openapi
 * /v1/student/:studentID:
 *   get:
 *     tags:
 *       - Students
 *     description: Endpoint to Get a Student Member
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetStudentRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateStudentSuccess'
 *
 */
/**
 * @openapi
 * /v1/students:
 *   get:
 *     tags:
 *       - Students
 *     description: Endpoint to Get all Student Members
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmptyRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateStudentSuccess'
 *
 */
/**
 * @openapi
 * /v1/student:
 *   post:
 *     tags:
 *       - Students
 *     description: Endpoint to Create a new Student Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateStudentSuccess'
 *
 */
/**
 * @openapi
 * /v1/student:
 *   patch:
 *     tags:
 *       - Students
 *     description: Endpoint to Update a Student Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateStudentSuccess'
 *
 */
router
  .route('/')
  .post([isStaff, validate({ body: addStudentSchema })], postStudent)
  .get(getStudents);

router
  .route('/:studentId')
  .patch([isStaff, validate({ body: addStudentSchema })], patchStudentByID)
  .get(getStudentByID);

export default router;
