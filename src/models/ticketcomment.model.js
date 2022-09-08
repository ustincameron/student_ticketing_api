import {
  Model,
} from 'sequelize';
const ticketComment = (sequelize, DataTypes) => {
  class TicketComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.TicketComment.belongsTo(models.Ticket, { foreignKey: 'id', targetId: 'ticketID' });
      models.TicketComment.hasOne(models.Student, { foreignKey: 'id', targetId: 'authorID' });
      models.TicketComment.hasOne(models.Staff, { foreignKey: 'id', targetId: 'authorID' });
    }
  }
  TicketComment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ticketID: DataTypes.UUID,
    authorID: DataTypes.UUID,
    message: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'TicketComment',
  });
  return TicketComment;
};

export default ticketComment;