const Player = require("../Models/Player.js");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getPlayer(name) {
    if (name == null) {
        return null;
    }
    try {
        const data = await Player.findAll({
            where: {
                name: name
            },
        });

        if (data.length === 0) {
            return null;
        }
        return data[0].dataValues;
    } catch (error) {
        throw new Error('Error getting player!')
    }
}

async function getRandomPlayer() {
    try {
        const data = await Player.findAll();
        const index= getRandomInt(0, data.length);
        if (!data[index]) {
            return null;
        }
        return data[index].dataValues;
    } catch (error) {
        throw new Error('Error fetching random player!');
    }
}



async function test() {
    const data = await getPlayer('Justin Jefferson');
    console.log(data);
}

test();

module.exports = {getPlayer, getRandomPlayer};