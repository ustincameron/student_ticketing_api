import db from '../models/index.js';

/**
 * @constant {Sequelize.models} - Ticket & Skill model extracted from db import
 */
const { Ticket, TicketComment } = db.db;

/**
 * findAll function to retrieve all available tickets in system
 *
 * @returns {Promise} Ticket object array
 */
const findAll = async () => Ticket.findAll({
});

/**
 * findById function to fetch data for provided ticketId
 *
 * @param {number} ticketId - ticket id for which data needs to be fetched
 * @returns {Promise} Ticket object
 */
const findById = async ticketId => Ticket.findOne({
  where: { id: ticketId },
});

/**
 * findById function to fetch data for provided ticketId
 *
 * @param {number} ticketId - ticket id for which data needs to be fetched
 * @returns {Promise} Ticket object
 */
const findByStudentID = async studentID => Ticket.findOne({
  where: { studentID },
});

/**
 * create function to add new ticket
 *
 * @param {object} data - ticket object with information to be saved in system
 * @returns {Promise} Created ticket object
 */
const create = async data => Ticket.create(data, {
});

/**
 * patch function to update ticket
 *
 * @param {object} data - staff object with information to be saved in system
 * @returns {Promise} Updated ticket object
 */
const patchByID = async (data, ticketId) => Ticket.update(data, {
  where: { id: ticketId },
}).then(() => Ticket.findOne({
  where: { id: ticketId },
}));

/**
 * patch function to delete ticket
 *
 * @param {object} data - staff object with information to be saved in system
 * @returns {Promise} Status of Deleted ticket object
 */
const destroyByID = async ticketId => Ticket.destroy({
  where: { id: ticketId },
});
export {
  findAll,
  findById,
  findByStudentID,
  create,
  patchByID,
  destroyByID,
};
