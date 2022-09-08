import jwt from 'jsonwebtoken';
import * as errors from '../utils/api-error.js';
import { findById as StudentFindById } from '../services/student.service.js';
import { findById as StaffFindById } from '../services/staff.service.js';
import { findByStudentID as TicketFindByStudentID } from '../services/ticket.service.js';
import { findByAuthorID as TicketCommentFindByAuthorID } from '../services/ticketcomment.service.js';

const { BadRequestError } = errors.default;

const currentUUID = req => {
  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SERVER_SECRET);
};

export const isStaffAdmin = async (req, res, next) => {
  try {
    const userID = currentUUID(req);
    const staff = await StaffFindById(userID);
    if (staff.admin) {
      next();
    } else {
      throw new BadRequestError('Auth failed!');
    }
  } catch (error) {
    throw new BadRequestError('Auth failed!');
  }
};

export const isStaff = async (req, res, next) => {
  try {
    const userID = currentUUID(req);
    const staff = await StaffFindById(userID);
    if (staff) {
      next();
    } else {
      throw new BadRequestError('Auth failed!');
    }
  } catch (error) {
    throw new BadRequestError('Auth failed!');
  }
};

export const isStudent = async (req, res, next) => {
  try {
    const userID = currentUUID(req);
    const student = await StudentFindById(userID);
    if (student) {
      next();
    } else {
      throw new BadRequestError('Auth failed!');
    }
  } catch (error) {
    throw new BadRequestError('Auth failed!');
  }
};

export const isStaffOrOwner = async (req, res, next) => {
  try {
    const userID = currentUUID(req);
    const staff = await StaffFindById(userID);
    const ticketOwner = await TicketFindByStudentID(userID);
    const commentOwner = await TicketCommentFindByAuthorID(userID);
    if (staff || ticketOwner || commentOwner) {
      next();
    } else {
      throw new BadRequestError('Auth failed!');
    }
  } catch (error) {
    throw new BadRequestError('Auth failed!');
  }
};
