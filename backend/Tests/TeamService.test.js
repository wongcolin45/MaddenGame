
const {getTeamID} = require('../Services/TeamService');
const Player = require("../Models/Player.js");
const {sequelize, syncDatabase} = require('../connection.js');


beforeAll(async () => {
    await sequelize.sync({force: false});
});


test('getTeamID', async () => {
    let player;
    // Get Name
    const teams = ['New England Patriots', 'Dallas Cowboys', 'Buffalo Bills', 'San Fransisco 49ers'];

    for (const team of teams) {
        //console.log('team'+ team)
        const id = await getTeamID(team);
        const isInt = Number.isInteger(id);
        //console.log('is Int: ' + isInt);
        //console.log(typeof isInt)
        //expect(isInt=== true).toBe(true);
        expect(id).toBeGreaterThanOrEqual(1);
        //expect(id).toBeLessThanOrEqual(32);
    }
});




