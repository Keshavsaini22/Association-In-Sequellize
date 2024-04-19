'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommonStudentBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Books, Students }) {
      // define association here
      this.belongsTo(Books, { foreignKey: 'bookId', as: 'book' })
      this.belongsTo(Students, { foreignKey: 'studentId', as: 'student' })
    }
  }
  CommonStudentBook.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books',//table name
        key: 'id'
      }
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'students',//table name
        key: 'id'
      }
    },
  }, {
    sequelize,
    tableName: 'commonStudentBook',
    modelName: 'CommonStudentBook',
  });
  return CommonStudentBook;
};