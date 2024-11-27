const {getRandomInt} = require("../Utils");
const {Team, Player} = require('../Models/Index.js');

async function getTeamID(name) {
    try {
        const data = await Team.findAll({
            where: {
                name: name
            }
        })
        return parseInt(data[0].dataValues.id, 10);
    } catch (error) {
        console.log(`Error fetching team id: for ${name}`);
        return {}
    }
}

async function getRandomTeam(){
    const id = getRandomInt(0, 32);
    try {
        const data = await Team.findOne({
            where: {
                id: id
            },
            attributes: ['name', 'image']
        })
        if (data.length === 0) {
            console.log('No team found for index ' + id + '!');
            return null
        }
        return data.dataValues;
    } catch {
        console.log('Error fetching team!');
        return null;
    }
}

async function getPlayersOnTeam(team) {
    const teamID = await getTeamID(team);
    const data = await Team.findOne({
        where: { id: teamID }, // Filter the specific team
        include: {
            model: Player,
            attributes: ['name', 'position', 'rating'], // Specify which player attributes to include
        },
    });
    return data.dataValues.Players.map(player => player.dataValues);

}




async function test(team) {
    const data = await getRandomTeam();
    console.log(data);
}

//test();


module.exports = {
    getTeamID,
    getRandomTeam,
    getPlayersOnTeam,
}
