import httpStatus from 'http-status';

import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import {
  findAll, findByID, create, patchByID, destroyByID,
} from '../services/ticketcategory.service.js';

/**
 * @constant {function} responseHandler - function to form generic success response
 */
const responseHandler = response.default;
/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError } = errors.default;

/**
 * Function which provides functionality
 * to add/create new ticketcategory in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const addTicketCategory = async (req, res) => {
  const TicketCategoryDetails = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(TicketCategoryDetails));
};

/**
 * Function which provides functionality
 * to retrieve all ticketcategories present in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getTicketCategories = async (req, res) => {
  const TicketCategories = await findAll();
  res.status(httpStatus.OK).send(responseHandler(TicketCategories));
};

/**
 * Function which provides functionality
 * to retrieve specific TicketCategory based on provided TicketCategoryId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such TicketCategory exists for provided TicketCategoryId
 */
const getTicketCategory = async (req, res) => {
  console.log(req.params.ticketCategoryId);
  const TicketCategory = await findByID(req.params.ticketCategoryId);
  if (!TicketCategory) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(TicketCategory));
};
/**
 * Function which provides functionality
 * to retrieve specific TicketCategory based on provided TicketCategoryId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such TicketCategory exists for provided TicketCategoryId
 */
const patchTicketCategoryByID = async (req, res) => {
  const TicketCategory = await patchByID(req.body, req.params.ticketCategoryId);
  if (!TicketCategory) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(TicketCategory));
};

/**
 * Function which provides functionality
 * to delete specific ticket category based on provided ticketCategoryId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such ticket category exists for provided ticketCategoryId
 */
const deleteTicketCategoryByID = async (req, res) => {
  const { id } = req.body;
  const ticket = await destroyByID(id);
  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(null, ticket));
};

export {
  addTicketCategory,
  getTicketCategories,
  getTicketCategory,
  patchTicketCategoryByID,
  deleteTicketCategoryByID,
};
