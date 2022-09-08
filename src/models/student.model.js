import {
  Model,
} from 'sequelize';

const student = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Student.hasMany(models.Ticket, { foreignKey: 'id', targetId: 'studentID' });
      // models.Student.hasMany(models.TicketComment, { foreignKey: 'id', targetId: 'authorID' });
    }
  }
  Student.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    building: DataTypes.STRING,
    room: DataTypes.STRING,
    bed: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    tableName: 'Students',
    modelName: 'Student',
  });
  return Student;
};

export default student;
