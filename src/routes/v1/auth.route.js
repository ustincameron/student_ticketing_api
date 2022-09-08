import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import { postAuth, postAuthConfirm } from '../../controllers/auth.controller.js';
import { authInitiateSchema } from '../../validations/auth-request.schema.js';
import { authConfirmSchema } from '../../validations/authconfirm-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email used for Login.
 *           example: hello@example.com
 *         phoneNumber:
 *           type: string
 *           description: The Phone Number used for Login.
 *           example: 123-456-7890
 *         mode:
 *           type: string
 *           enum: [student, staff]
 *     AuthConfirm:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email used for Login.
 *           example: hello@example.com
 *         phoneNumber:
 *           type: string
 *           description: The Phone Number used for Login.
 *           example: 123-456-7890
 *         otp:
 *           type: string
 *           example: 12345
 *
 *     AuthStudentSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         accessToken:
 *           type: string
 *           example: ABC123890XYZ
 *         data:
 *           allOf:
 *           - $ref: '#/components/schemas/Student'
 *           - type: object
 *
 *     AuthStaffSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         accessToken:
 *           type: string
 *           example: ABC123890XYZ
 *         data:
 *           allOf:
 *           - $ref: '#/components/schemas/Staff'
 *           - type: object
 */

/**
 * @openapi
 * /v1/auth/:
 *   post:
 *     tags:
 *       - Auth
 *     description: Endpoint to Initiate a Login Request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericSuccess'
 *
 */
/**
 * @openapi
 * /v1/auth/confirm:
 *   post:
 *     tags:
 *       - Auth
 *     description: Endpoint to Confirm a Login Request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthConfirm'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthStudentSuccess'
 *
 */
router
  .route('/')
  .post(validate({ body: authInitiateSchema }), postAuth);

router
  .route('/confirm')
  .post(validate({ body: authConfirmSchema }), postAuthConfirm);

export default router;
