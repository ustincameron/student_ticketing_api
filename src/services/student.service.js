import db from '../models/index.js';

/**
 * @constant {Sequelize.models} - Student & Skill model extracted from db import
 */
const { Student } = db.db;

/**
 * findAll function to retrieve all available students in system
 *
 * @returns {Promise} Student object array
 */
const findAll = async () => Student.findAll({
});

/**
 * findById function to fetch data for provided studentId
 *
 * @param {number} studentId - student id for which data needs to be fetched
 * @returns {Promise} Student object
 */
const findById = async studentId => Student.findOne({
  where: { id: studentId },
});

/**
 * create function to add new student
 *
 * @param {object} data - student object with information to be saved in system
 * @returns {Promise} Created student object
 */
const create = async data => Student.create(data, {
});

/**
 * patch function to update student
 *
 * @param {object} data - staff object with information to be saved in system
 * @returns {Promise} Updated student object
 */

const patchById = async (data, studentId) => Student.update(data, {
  where: { id: studentId },
}).then(() => Student.findOne({
  where: { id: studentId },
}));
export {
  findAll,
  findById,
  create,
  patchById,
};
