import httpStatus from 'http-status';

import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import {
  findAll, findById, create, patchByID, destroyByID,
} from '../services/ticket.service.js';

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
 * to add/create new ticket in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const postTicket = async (req, res) => {
  const ticketDetails = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(ticketDetails));
};

/**
 * Function which provides functionality
 * to retrieve all tickets present in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getTickets = async (req, res) => {
  console.log(req.params.order);
  const tickets = await findAll({
    order: [
      ['createdAt', req.params.order ?? 'DESC'],
    ],
  });
  res.status(httpStatus.OK).send(responseHandler(tickets));
};

const getTicketsByPriority = async (req, res) => {
  console.log(req.params.order);
  const tickets = await findAll({
    order: [
      ['priority', req.params.order ?? 'DESC'],
      ['createdAt', 'DESC'],
    ],
  });
  res.status(httpStatus.OK).send(responseHandler(tickets));
};

/**
 * Function which provides functionality
 * to retrieve specific ticket based on current user
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such ticket exists for current user
 */
const getCurrentUserTickets = async (req, res) => {
  const ticket = await findById(req.params.ticketId);
  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(ticket));
};

/**
 * Function which provides functionality
 * to retrieve specific ticket based on provided ticketId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such ticket exists for provided ticketId
 */
const getTicketByID = async (req, res) => {
  const ticket = await findById(req.params.ticketId);
  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(ticket));
};

/**
 * Function which provides functionality
 * to retrieve specific ticket based on provided ticketId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such ticket exists for provided ticketId
 */
const patchTicketByID = async (req, res) => {
  const ticket = await patchByID(req.body, req.params.ticketId);
  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(ticket));
};

/**
 * Function which provides functionality
 * to delete specific ticket based on provided ticketId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such ticket exists for provided ticketId
 */
const deleteTicketByID = async (req, res) => {
  const { ticketID } = req.body;
  const ticket = await destroyByID(ticketID);
  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(null, ticket));
};

export {
  postTicket,
  getTickets,
  getTicketByID,
  patchTicketByID,
  deleteTicketByID,
  getCurrentUserTickets,
  getTicketsByPriority,
};
