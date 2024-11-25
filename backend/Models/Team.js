const { Model, DataTypes } = require('sequelize');


const {sequelize} = require('../connection.js');


class Team extends Model {}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        name: {
            type: DataTypes.TEXT,
            field: 'name'
        },
        image: {
            type: DataTypes.TEXT,
            field: 'image'
        }
    },
    { sequelize, tableName: 'Teams', timestamps: false}
)

module.exports = Team;




