
const Team = require(`./Team`);
const Player = require(`./Player`);


Team.hasMany(Player, { foreignKey: 'teamID' });
Player.belongsTo(Team, { foreignKey: 'teamID' });

module.exports = {
    Team,
    Player
}