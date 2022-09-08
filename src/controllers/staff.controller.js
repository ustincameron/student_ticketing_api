import httpStatus from 'http-status';

import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import { findAll, findById, create, patchById } from '../services/staff.service.js';

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
 * to add/create new staff in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const postStaff = async (req, res) => {
  const staffDetails = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(staffDetails));
};

/**
 * Function which provides functionality
 * to retrieve all staff present in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getStaff = async (req, res) => {
  const staff = await findAll();
  res.status(httpStatus.OK).send(responseHandler(staff));
};

/**
 * Function which provides functionality
 * to retrieve specific staff based on provided staffId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such staff exists for provided staffId
 */
const getStaffByID = async (req, res) => {
  const staff = await findById(req.params.staffId);
  if (!staff) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(staff));
};

/**
 * Function which provides functionality
 * to retrieve specific staff based on provided staffId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such staff exists for provided staffId
 */
const patchStaffByID = async (req, res) => {
  const staff = await patchById(req.body, req.params.staffId);
  if (!staff) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(staff));
};

export {
  postStaff,
  getStaffByID,
  getStaff,
  patchStaffByID,
};
