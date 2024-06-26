'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Students }) {
      // define association here
      this.hasMany(Students, { foreignKey: 'classId', as: 'students' })
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Class.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'classes',
    modelName: 'Classes',
  });
  return Class;
};