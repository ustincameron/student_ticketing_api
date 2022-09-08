import db from '../models/index.js';

/**
 * @constant {Sequelize.models} - TicketCategory & Skill model extracted from db import
 */
const { TicketCategory } = db.db;

/**
 * findAll function to retrieve all available ticketCategorys in system
 *
 * @returns {Promise} TicketCategory object array
 */
const findAll = async () => TicketCategory.findAll({
});

/**
 * findById function to fetch data for provided ticketCategoryId
 *
 * @param {number} ticketCategoryId - ticketCategory id for which data needs to be fetched
 * @returns {Promise} TicketCategory object
 */
const findByID = async ticketCategoryId => TicketCategory.findOne({
  where: { id: ticketCategoryId },
});

/**
 * create function to add new ticketCategory
 *
 * @param {object} data - ticketCategory object with information to be saved in system
 * @returns {Promise} Created ticketCategory object
 */
const create = async data => TicketCategory.create(data, {
});

/**
 * patch function to update ticketCategory
 *
 * @param {object} data - staff object with information to be saved in system
 * @returns {Promise} Status of Deleted tticketCategoryicket object
 */
const patchByID = async (data, ticketCategoryId) => TicketCategory.update(data, {
  where: { id: ticketCategoryId },
}).then(() => TicketCategory.findOne({
  where: { id: ticketCategoryId },
}));
const destroyByID = async ticketCategoryId => TicketCategory.destroy({
  where: { id: ticketCategoryId },
});
export {
  findAll,
  findByID,
  create,
  patchByID,
  destroyByID,
};
