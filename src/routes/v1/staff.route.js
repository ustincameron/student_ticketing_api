import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  postStaff, getStaff, getStaffByID, patchStaffByID,
} from '../../controllers/staff.controller.js';
import { addStaffSchema } from '../../validations/staffs-request.schema.js';
import { isStaff } from '../../middlewares/index.js';

const router = express.Router();
const { validate } = new Validator();

/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           description: The Staff Member's ID.
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         email:
 *           type: string
 *           description: The Staff's email.
 *           example: hello@example.com
 *         phoneNumber:
 *           type: string
 *           description: The Staff's Phone Number.
 *           example: 123-456-7890
 *         firstName:
 *           type: string
 *           description: The Staff's First Name.
 *           example: Steve
 *         lastName:
 *           type: string
 *           description: The Staff's Last Name.
 *           example: Jobs
 *         admin:
 *           type: boolean
 *           description: The Staff's Admin status.
 *           example: true
 *         active:
 *           type: boolean
 *           description: The Staff's Active status.
 *           example: true
 *     StaffRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The Staff's email.
 *           example: hello@example.com
 *         phoneNumber:
 *           type: string
 *           description: The Staff's Phone Number.
 *           example: 123-456-7890
 *         firstName:
 *           type: string
 *           description: The Staff's First Name.
 *           example: Steve
 *         lastName:
 *           type: string
 *           description: The Staff's Last Name.
 *           example: Jobs
 *         admin:
 *           type: boolean
 *           description: The Ticket's Admin status.
 *           example: true
 *         active:
 *           type: boolean
 *           description: The Staff's Active status.
 *           example: true
 *
 *     GetStaffRequest:
 *       type: object
 *       properties:
 *         staffID:
 *             type: string
 *             description: The Staff Member's ID.
 *             example: 123e4567-e89b-12d3-a456-426655440000
 *     CreateStaffRequest:
 *       allOf:
 *       - $ref: '#/components/schemas/Staff'
 *       - type: object
 *
 *     CreateStaffSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         data:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Staff'
 *
 *     Generic401:
 *       type: string
 *       description: The Generic Unauthorized Message.
 *       example: Unauthorized
 *
 *     Generic403:
 *       type: string
 *       description: The Generic Forbidden Message.
 *       example: Forbidden
 *
 *     Generic500:
 *       type: object
 *       description: The Generic Forbidden Message.
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         msg:
 *           type: string
 *           description: Event Message
 *           example: true
 *         error:
 *           type: object
 *           description: Event Errors
 */

/**
 * @openapi
 * /v1/staff/:staffID:
 *   get:
 *     tags:
 *       - Staff
 *     description: Endpoint to Get a Staff Member
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetStaffRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateStaffSuccess'
 *
 */
/**
 * @openapi
 * /v1/staff:
 *   get:
 *     tags:
 *       - Staff
 *     description: Endpoint to Get all Staff Members
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
 *               $ref: '#/components/schemas/CreateStaffSuccess'
 *
 */
/**
 * @openapi
 * /v1/staff:
 *   post:
 *     tags:
 *       - Staff
 *     description: Endpoint to Create a new Staff Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StaffRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateStaffSuccess'
 *       401:
 *         description: Generic Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Generic401'
 *
 */
/**
 * @openapi
 * /v1/staff:
 *   patch:
 *     tags:
 *       - Staff
 *     description: Endpoint to Update a Staff Member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateStaffSuccess'
 *
 */
router
  .route('/')
  .post([isStaff, validate({ body: addStaffSchema })], postStaff)
  .get(getStaff);

router
  .route('/:staffId')
  .patch([isStaff, validate({ body: addStaffSchema })], patchStaffByID)
  .get(getStaffByID);

export default router;
