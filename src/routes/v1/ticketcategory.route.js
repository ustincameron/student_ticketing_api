import express from 'express';
import { Validator } from 'express-json-validator-middleware';

import { addTicketCategory, getTicketCategories, getTicketCategory, patchTicketCategoryByID, deleteTicketCategoryByID } from '../../controllers/ticketcategory.controller.js';
import { addTicketCategorySchema } from '../../validations/ticketcategories-request.schema.js';
import { deleteTicketCategorySchema } from '../../validations/ticketcategory-delete-request.schema.js';
import { isStaff } from "../../middlewares/index.js";

const router = express.Router();
const { validate } = new Validator();

/**
 * @swagger
 * components:
 *   schemas:
 *     TicketCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ticketCategory's ID.
 *           example: 4
 *         name:
 *           type: string
 *           description: The ticketCategory's short name.
 *           example: Maintenance
 *         description:
 *           type: string
 *           description: The TicketCategory's full description.
 *           example: General Maintenance Requests
 *         orderBy:
 *           type: integer
 *           example: 8
 *         active:
 *           type: boolean
 *     TicketCategoryRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The ticketCategory's short name.
 *           example: Maintenance
 *         description:
 *           type: string
 *           description: The TicketCategory's full description.
 *           example: General Maintenance Requests
 *         orderBy:
 *           type: integer
 *           example: 8
 *         active:
 *           type: boolean
 *     TicketCategoryDeleteRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ticketCategory's ID.
 *           example: 4
 *     GenericSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: The status of the API request.
 *           example: true
 *     GenericDeleteSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: The status of the API request.
 *           example: true
 *         data:
 *           type: object
 *           example: null
 *
 *     GetTicketCategoriesRequest:
 *       type: object
 *
 *     GetTicketCategoriesSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         data:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/TicketCategory'
 *
 *     CreateTicketCategoryRequest:
 *       allOf:
 *       - $ref: '#/components/schemas/TicketCategoryRequest'
 *
 *     CreateTicketCategorySuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Flag stating status of API call
 *           example: true
 *         data:
 *           allOf:
 *           - $ref: '#/components/schemas/TicketCategory'
 *           - type: object
 */

/**
 * @openapi
 * /v1/ticket/categories:
 *   get:
 *     tags:
 *       - Ticket Categories
 *     description: Endpoint to get ticketCategories
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetTicketCategoriesRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTicketCategoriesSuccess'
 *
 */
/**
 * @openapi
 * /v1/ticket/category:
 *   post:
 *     tags:
 *       - Ticket Categories
 *     description: Endpoint to create/add new ticketCategory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTicketCategoryRequest'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTicketCategorySuccess'
 *
 */
/**
 * @openapi
 * /v1/ticket/category:
 *   patch:
 *     tags:
 *       - Ticket Categories
 *     description: Endpoint to Update a ticketCategory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketCategory'
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTicketCategorySuccess'
 *
 */
/**
 * @openapi
 * /v1/ticket/category:
 *   delete:
 *     tags:
 *       - Ticket Categories
 *     description: Endpoint to Delete a ticketCategory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketCategoryDeleteRequest'
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
  .post([isStaff, validate({ body: addTicketCategorySchema })], addTicketCategory)
  .delete([isStaff, validate({ body: deleteTicketCategorySchema })], deleteTicketCategoryByID)
  .get(getTicketCategories);

router
  .route('/:ticketCategoryId')
  .patch([isStaff, validate({ body: addTicketCategorySchema })], patchTicketCategoryByID)
  .get(getTicketCategory);

export default router;
