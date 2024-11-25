const { Model, DataTypes } = require('sequelize');


const {sequelize} = require('../connection.js');


class Player extends Model {}

Player.init(
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
        position: {
            type: DataTypes.TEXT,
            field: 'position'
        },
        image: {
            type: DataTypes.TEXT,
            field: 'image'
        },
        rating: {
            type: DataTypes.INTEGER,
            field: 'rating'
        },
        teamID: {
            type: DataTypes.INTEGER,
            field: 'team_id',
            references: {
                model: 'Team',
                key: 'id'
            }
        }
        
    },
    { sequelize, tableName: 'Players', timestamps: false}
)

module.exports = Player;



