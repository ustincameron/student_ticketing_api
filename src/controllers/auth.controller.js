import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import * as errors from '../utils/api-error.js';

/**
 * @constant {NotFoundError} NotFoundError - not found error object
 */
const { NotFoundError } = errors.default;

const postAuth = async (req, res) => {
  // todo - implement sms support via Twilio or Telnyx
  // todo - implement email smtp support
  // todo - implement TokenStorage migration / model
  // todo - store generated token/type in TokenStorage
  // eslint-disable-next-line no-unused-vars
  const { mode, phoneNumber, email } = req.body;
  const otpSent = true;
  const data = {
    success: otpSent,
  };

  res.status(httpStatus.OK).send(data);
};
const postAuthConfirm = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { otp, phoneNumber, email } = req.body;
  const found = otp; // await findByOTP(otp);
  if (!found) {
    throw new NotFoundError();
  } else {
    // todo - return Student or Staff depending on TokenStorage Mode
    const userObject = {
      id: '766df7c0-5d3b-4ed2-9a62-e75199405454',
      email: 'hello@example.com',
      phoneNumber: '123-456-7890',
      firstName: 'Steve',
      lastName: 'Jobs',
      building: 'Building A1',
      room: 'Room A321',
      bed: 'Bed 3',
      active: true,
    };
    const token = jwt.sign(
      userObject.id,
      process.env.JWT_SERVER_SECRET,
    );
    const data = {
      success: true,
      accessToken: token,
      data: userObject,
    };
    res.status(httpStatus.OK).send(data);
  }
};

export {
  postAuth,
  postAuthConfirm,
};
