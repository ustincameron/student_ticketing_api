import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import {
  postTicket, getTickets, getTicketsByPriority, getTicketByID, patchTicketByID, deleteTicketByID, getCurrentUserTickets,
} from '../../controllers/ticket.controller.js';
import { addTicketSchema } from '../../validations/tickets-request.schema.js';
import { deleteTicketSchema } from '../../validations/ticket-delete-request.schema.js';
import { isStudent, isStaff, isStaffAdmin, isStaffOrOwner } from "../../middlewares/index.js";

const router = express.Router();
const { validate } = new Validator();

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           description: The Ticket's ID.
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *         studentID:
 *           type: uuid
 *           description: The Student's ID.
 *           example: acde070d-8c4c-4f0d-9d8a-162843c10333
 *         subject:
 *           type: string
 *           description: The Ticket's primary Subject.
 *           example: Kitchen Sink
 *         location:
 *           type: string
 *           description: The Ticket's Location.
 *           example: Kitchen
 *         categoryID:
 *           type: id
 *           description: The Ticket's Assigned Category.
 *           example: 4
 *         priority:
 *           type: integer
 *           enum: ['1', '2', '3']
 *           example: 3
 *         orderBy:
 *           type: integer
 *           example: 1
 *         resolved:
 *           type: boolean
 *           example: true
 *         resolvedBy:
 *           type: uuid
 *           description: The Staff's ID.
 *           example: acde070d-9d8a-8c4c-4f0d-162843c10333
 *         resolvedAt:
 *           type: date
 *           example: 2022-09-06 11:30:17
 *         createdAt:
 *           type: date
 *           example: 2022-09-05 11:30:17
 *         updatedAt:
 *           type: date
 *           example: 2022-09-06 11:30:17
 *     TicketRequest:
 *       type: object
 *       properties:
 *         studentID:
 *           type: uuid
 *           description: The Student's ID.
 *           example: acde070d-8c4c-4f0d-9d8a-162843c10333
 *         subject:
 *           type: string
 *           description: The Ticket's primary Subject.
 *           example: Kitchen Sink
 *         location:
 *           type: string
 *           description: The Ticket's Location.
 *           example: Kitchen
 *         categoryID:
 *           type: id
 *           description: The Ticket's Assigned Category.
 *           example: 4
 *         priority:
 *           type: integer
 *           enum: ['1', '2', '3']
 *           example: 3
 *     TicketDeleteRequest:
 *       type: object
 *       properties:
 *         ticketID:
 *           type: uuid
 *           description: The Ticket's ID.
 *           example: 123e4567-e89b-12d3-a456-426655440000
 *     OrderRequest:
 *       type: enum
 *       enum: ['ASC', 'DESC']
 *     EmptyRequest:
 *       type: object
 *     GetTicketRequest:
 *       type: object
 *       properties:
 *         ticketID:
 *             type: string
 *             description: The Ticket's ID.
 *             example: 123e4567-e89b-12d3-a456-426655440000
 *
 *     GetTicketSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         data:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Ticket'
 *
 *     CreateTicketRequest:
 *       allOf:
 *       - $ref: '#/components/schemas/TicketRequest'
 *
 *     CreateTicketSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         data:
 *           allOf:
 *           - $ref: '#/components/schemas/Ticket'
 *           - type: object
 */

/**
 * @openapi
 * /v1/ticket/:ticketID:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Endpoint to get Tickets
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetTicketRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTicketSuccess'
 *
 */
/**
 * @openapi
 * /v1/tickets/sort/:order:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Endpoint to get Tickets by Creation Date
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTicketSuccess'
 *
 */
/**
 * @openapi
 * /v1/tickets/sort/priority/:order:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Endpoint to get Tickets by Priority
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTicketSuccess'
 *
 */
/**
 * @openapi
 * /v1/tickets:
 *   get:
 *     tags:
 *       - Tickets
 *     description: Endpoint to get Tickets
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
 *               $ref: '#/components/schemas/GetTicketSuccess'
 *
 */
/**
 * @openapi
 * /v1/ticket:
 *   post:
 *     tags:
 *       - Tickets
 *     description: Endpoint to add a new Ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTicketRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTicketSuccess'
 *
 */
/**
 * @openapi
 * /v1/ticket:
 *   patch:
 *     tags:
 *       - Tickets
 *     description: Endpoint to Update a Ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTicketSuccess'
 *
 */
/**
 * @openapi
 * /v1/ticket:
 *   delete:
 *     tags:
 *       - Tickets
 *     description: Endpoint to Delete a Ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketDeleteRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericDeleteSuccess'
 *
 */
router
  .route('/')
  .post([isStudent, validate({ body: addTicketSchema })], postTicket)
  .delete([isStaffAdmin, validate({ body: deleteTicketSchema })], deleteTicketByID)
  .get(isStaff, getTickets)
  .get(isStudent, getCurrentUserTickets);

router
  .route('/sort/:order')
  .get(isStaff, getTickets);
router
  .route('/sort/priority/:order')
  .get(isStaff, getTicketsByPriority);

router
  .route('/:ticketId')
  .patch([isStaff, validate({ body: addTicketSchema })], patchTicketByID)
  .get(isStaffOrOwner, getTicketByID);
export default router;
