import {
  Model,
} from 'sequelize';

const ticket = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Ticket.hasMany(models.TicketComment, { foreignKey: 'id', targetId: 'ticketID' });
      models.Ticket.hasOne(models.TicketCategory, { foreignKey: 'id', targetId: 'categoryID' });
      models.Ticket.hasOne(models.Student, { foreignKey: 'id', targetId: 'studentID' });
    }
  }
  Ticket.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    studentID: DataTypes.UUID,
    subject: DataTypes.STRING,
    categoryID: DataTypes.INTEGER,
    priority: DataTypes.INTEGER,
    orderBy: DataTypes.INTEGER,
    location: DataTypes.STRING,
    resolved: DataTypes.BOOLEAN,
    resolvedBy: DataTypes.UUID,
    resolvedAt: DataTypes.DATE,
  }, {
    sequelize,
    tableName: 'Tickets',
    modelName: 'Ticket',
  });
  return Ticket;
};

export default ticket;
