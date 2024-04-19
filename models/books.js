'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Students }) {
      // define association here
      this.belongsToMany(Students, { through: 'BookStudents' })
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Books.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'books',
    modelName: 'Books',
  });
  return Books;
};