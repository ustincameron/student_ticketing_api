import db from '../models/index.js';

/**
 * @constant {Sequelize.models} - Staff & Skill model extracted from db import
 */
const { TokenStorage } = db.db;

/**
 * findByOTP function to fetch data for provided otp
 *
 * @param {number} otp - otp for which data needs to be fetched
 * @returns {Promise} Staff or Student object
 */
const findByOTP = async otp => TokenStorage.findOne({
  where: { otp },
});

/**
 * findByToken function to fetch data for provided otp
 *
 * @param {number} otp - Token for which data needs to be fetched
 * @returns {Promise} Staff or Student object
 */
const findByToken = async otp => TokenStorage.findOne({
  where: { otp },
});

/**
 * create function to add new staff
 *
 * @param {object} data - TokenStorage with information to be saved in system
 * @returns {Promise} Created TokenStorage object
 */
const create = async data => TokenStorage.create(data, {
});


export {
  findByOTP,
  findByToken,
  create,
};
