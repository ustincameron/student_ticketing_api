import db from '../models/index.js';

/**
 * @constant {Sequelize.models} - Staff & Skill model extracted from db import
 */
const { Staff } = db.db;

/**
 * findAll function to retrieve all available staffs in system
 *
 * @returns {Promise} Staff object array
 */
const findAll = async () => Staff.findAll({
});

/**
 * findById function to fetch data for provided staffId
 *
 * @param {number} staffId - staff id for which data needs to be fetched
 * @returns {Promise} Staff object
 */
const findById = async staffId => Staff.findOne({
  where: { id: staffId },
});

/**
 * create function to add new staff
 *
 * @param {object} data - staff object with information to be saved in system
 * @returns {Promise} Created staff object
 */
const create = async data => Staff.create(data, {
});

/**
 * patch function to update staff
 *
 * @param {object} data - staff object with information to be saved in system
 * @returns {Promise} Updated staff object
 */

const patchById = async (data, staffId) => Staff.update(data, {
  where: { id: staffId },
}).then(() => Staff.findOne({
  where: { id: staffId },
}));

export {
  findAll,
  findById,
  create,
  patchById,
};
