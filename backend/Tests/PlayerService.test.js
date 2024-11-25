
const {getPlayer, getRandomPlayer} = require("../Services/PlayerService.js");
const Player = require("../Models/Player.js");
const {sequelize, syncDatabase} = require('../connection.js');


beforeAll(async () => {
    await sequelize.sync({force: false});
});


test('getPlayer', async () => {
    let player;
    // Get Name
    const names = ['Justin Jefferson', 'T.J. Watt', 'Josh Ross'];
    for (const name of names) {
        player = await getPlayer(name);
        expect(player.name).toBe(name);
        expect(player).toHaveProperty('image');
        expect(player).toHaveProperty('rating');
    }

    // Invliad request
    player = await getPlayer("Lebron James");
    expect(player).toBe(null);
});


test('getRandomPlayer', async () => {
    const outline = { name: 'name', image: 'image.jpg', 'rating': 99 };
    let player = await getRandomPlayer();
    expect(player).toHaveProperty('name');
    expect(player).toHaveProperty('image');
    expect(player).toHaveProperty('rating');

});