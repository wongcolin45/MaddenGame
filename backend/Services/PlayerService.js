
const {Player} = require('../Models/Index.js');

const {getRandomInt} = require('../utils.js');


async function getPlayer(name) {
    if (name == null) {
        console.log('Name is null!')
        return null;
    }
    try {
        const data = await Player.findAll({
            where: {
                name: name
            },
        });

        if (data.length === 0) {
            console.log('Player not found!');
            return null;
        }
        return data[0].dataValues;
    } catch (error) {
        console.log('Error getting player!')
        return null;
    }
}

async function getRandomPlayer() {
    const id = getRandomInt(0, 1868);
    try {
        const data = await Player.findOne({
            where: {
                id: id
            },
            attributes: ['name', 'position', 'rating'],
        });

        if (!data) {
            return null;
        }
        return data.dataValues;
    } catch (error) {
        throw new Error('Error fetching random player!');
    }
}

async function getRandomPlayerAtPosition(position) {
    try {
        const data = await Player.findAll({
            where: {
                position: position,
            },
            attributes: ['name', 'position', 'rating'],
        });
        if (!data) {
            return null;
        }

        const index = getRandomInt(0, data.length);
        console.log('giving '+data[index]);
        return data[index].dataValues;

    } catch (error) {
        throw new Error('Error fetching random player!');
    }
}

async function test() {
    const position = 'TE';
    const data = await getRandomPlayerAtPosition(position);
    console.log(data);
}

//test();

module.exports = {
    getPlayer,
    getRandomPlayer,
    getRandomPlayerAtPosition,
};