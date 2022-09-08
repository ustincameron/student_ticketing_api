import httpStatus from 'http-status';

import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import {
  findAll, findById, create, patchById,
} from '../services/student.service.js';

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
 * to add/create new student in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const postStudent = async (req, res) => {
  const studentDetails = await create(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(studentDetails));
};

/**
 * Function which provides functionality
 * to retrieve all students present in system
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
const getStudents = async (req, res) => {
  const students = await findAll();
  res.status(httpStatus.OK).send(responseHandler(students));
};

/**
 * Function which provides functionality
 * to retrieve specific student based on provided studentId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such student exists for provided studentId
 */
const getStudentByID = async (req, res) => {
  const student = await findById(req.params.studentId);
  if (!student) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(student));
};

/**
 * Function which provides functionality
 * to retrieve specific student based on provided studentId
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 *
 * @throws {NotFoundError} - if no such student exists for provided studentId
 */
const patchStudentByID = async (req, res) => {
  const student = await patchById(req.body, req.params.studentId);
  if (!student) {
    throw new NotFoundError();
  }

  res.status(httpStatus.OK).send(responseHandler(student));
};

export {
  getStudents,
  getStudentByID,
  postStudent,
  patchStudentByID,
};
