'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Classes, Books }) {//model name
      // define association here
      this.belongsTo(Classes, { foreignKey: 'classId', as: 'class' })
      this.belongsToMany(Books, { through: 'BookStudents' })
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Students.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'classes',//table name
        key: 'id'
      }
    },
    rollNo: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'students',
    modelName: 'Students',
  });
  return Students;
};