'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BookStudent extends Model {
        static associate() {
            // define association here
        }
    }
    BookStudent.init({
        StudentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'students',
                key: 'id'
            }
        },
        BookId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'books',
                key: 'id'
            }
        },
    }, {
        sequelize,
        modelName: 'BookStudents',
    });
    return BookStudent;
};