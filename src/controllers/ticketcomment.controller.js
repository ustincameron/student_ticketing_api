
import httpStatus from 'http-status';

import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import { findAll, findById, create } from '../services/ticketcomment.service.js';

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
 * to add/create new ticketcomment in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const addTicketComment = async (req, res) => {
  const ticketCommentDetails = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(ticketCommentDetails));
};

/**
 * Function which provides functionality
 * to retrieve all ticketcomments present in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getTicketComments = async (req, res) => {
  const ticketComments = await findAll();
  res.status(httpStatus.OK).send(responseHandler(ticketComments));
};

/**
 * Function which provides functionality
 * to retrieve specific ticketComment based on provided ticketCommentId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such ticketComment exists for provided ticketCommentId
 */
const getTicketComment = async (req, res) => {
  const ticketComment = await findById(req.params.ticketCommentId);
  if (!ticketComment) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(ticketComment));
};

export {
  addTicketComment,
  getTicketComments,
  getTicketComment,
};
