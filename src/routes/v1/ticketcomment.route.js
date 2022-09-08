import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  addTicketComment,
  getTicketComments,
  getTicketComment,
} from '../../controllers/ticketcomment.controller.js';
import { addTicketCommentSchema } from '../../validations/ticketcomments-request.schema.js';
import {isStaffOrOwner} from "../../middlewares/index.js";

const router = express.Router();
const { validate } = new Validator();

/**
 * @swagger
 * components:
 *   schemas:
 *     TicketCommentRequestBody:
 *       type: object
 *       properties:
 *         ticketID:
 *           type: uuid
 *           description: The Ticket of the TicketComment.
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         authorID:
 *           type: uuid
 *           description: The TicketComment's Author.
 *           example: acde070d-8c4c-4f0d-9d8a-162843c10333
 *         message:
 *           type: string
 *           description: The TicketComment's primary content.
 *           example: Hi, can you please help me with...
 *
 *     TicketComment:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           description: The TicketComment's ID.
 *           example: acde4567-9d8a-4f0d-a456-103335441628
 *         ticketID:
 *           type: uuid
 *           description: The Ticket of the TicketComment.
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         authorID:
 *           type: uuid
 *           description: The TicketComment's Author.
 *           example: acde070d-8c4c-4f0d-9d8a-162843c10333
 *         message:
 *           type: string
 *           description: The TicketComment's primary content.
 *           example: General Maintenance Requests
 *         createdAt:
 *           type: date
 *           description: The TicketComment's creation date.
 *           example: 2022-09-06 11:30:17
 *
 *     GetTicketCommentRequest:
 *       type: object
 *       properties:
 *         ticketID:
 *             type: string
 *             description: The Ticket's ID.
 *             example: 123e4567-e89b-12d3-a456-426655440000
 *
 *     GetTicketCommentSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         data:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/TicketComment'
 *
 *     CreateTicketCommentRequest:
 *       allOf:
 *       - $ref: '#/components/schemas/TicketCommentRequestBody'
 *       - type: object
 *
 *     CreateTicketCommentSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         data:
 *           allOf:
 *           - $ref: '#/components/schemas/TicketComment'
 *           - type: object
 */

/**
 * @openapi
 * /v1/ticket/comments/:ticketID:
 *   get:
 *     tags:
 *       - Ticket Comments
 *     description: Endpoint to get all Ticket Comments attached to a Ticket ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetTicketCommentRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTicketCommentSuccess'
 *
 */
/**
 * @openapi
 * /v1/ticket/comments/:
 *   get:
 *     tags:
 *       - Ticket Comments
 *     description: Endpoint to get all Ticket Comments from CurrentUser
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetTicketCommentRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTicketCommentSuccess'
 *
 */
/**
 * @openapi
 * /v1/ticket/comment:
 *   post:
 *     tags:
 *       - Ticket Comments
 *     description: Endpoint to create/add new ticketComment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTicketCommentRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTicketCommentSuccess'
 *
 */
router
  .route('/')
  .post([isStaffOrOwner, validate({ body: addTicketCommentSchema })], addTicketComment)
  .get(isStaffOrOwner, getTicketComments);

router
  .route('/:ticketCommentId')
  .get(isStaffOrOwner, getTicketComment);

export default router;
