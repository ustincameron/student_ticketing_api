
import db from '../models/index.js';

/**
 * @constant {Sequelize.models} - TicketComment & Skill model extracted from db import
 */
const { TicketComment, Skill } = db.db;

/**
 * findAll function to retrieve all available ticketComments in system
 *
 * @returns {Promise} TicketComment object array
 */
const findAll = async () => TicketComment.findAll({
});

/**
 * findById function to fetch data for provided ticketCommentId
 *
 * @param {number} ticketCommentId - ticketComment id for which data needs to be fetched
 * @returns {Promise} TicketComment object
 */
const findById = async ticketCommentId => TicketComment.findOne({
  where: { id: ticketCommentId },
});

/**
 * findById function to fetch data for provided ticketCommentId
 *
 * @param {number} ticketCommentId - ticketComment id for which data needs to be fetched
 * @returns {Promise} TicketComment object
 */
const findByAuthorID = async authorID => TicketComment.findOne({
  where: { authorID: authorID },
});

/**
 * create function to add new ticketComment
 *
 * @param {object} data - ticketComment object with information to be saved in system
 * @returns {Promise} Created ticketComment object
 */
const create = async data => TicketComment.create(data, {
});

export {
  findAll,
  findById,
  findByAuthorID,
  create,
};
