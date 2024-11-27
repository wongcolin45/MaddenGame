
const {getRandomPlayer, getRandomPlayerAtPosition} = require('./Services/PlayerService');

const express = require('express')
const cors = require('cors');
const {getRandomTeam, getPlayersOnTeam} = require("./Services/TeamService");
const app = express()
const port = 3000

app.use(cors());

app.get('/', (req, res) => {
    res.send('Madden API up and running!/')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function filterPlayers(players, positions) {
    const newPlayers = [];
    for (const position of positions) {
        const player  = players.find(player => player.position === position);
        if (player !== null) {
            newPlayers.push(player);
        }
    }
    return newPlayers;
}

function averagePlayerRating(players) {
    let total = 0;
    players.forEach(player => {
        total += player.rating;
    });
    return total / players.length;
}

app.get('/players/random', async (req, res) => {
    try {
        const player = await getRandomPlayer();
        console.log(player);
        res.status(200).json(player);
    } catch (error) {
        res.status(500).send('Server error querying database!');
    }
})

app.get('/player/random/:position', async (req, res) => {
    try {
        const position = req.params.position;
        const player = await getRandomPlayerAtPosition(position);
        res.status(200).json(player);
    } catch (error) {
        res.status(500).send('Server error querying database!');
    }
})

app.get('/team/random', async (req, res) => {
    try {
        const team = await getRandomTeam();
        res.status(200).json(team);
    } catch (error) {
        res.status(500).send('Server error querying database!');
    }
})

app.get('/team/random/players', async (req, res) => {
    try {
        const team = await getRandomTeam();
        const players = await getPlayersOnTeam(team.name);
        const positions = ['QB', 'HB', 'WR', 'TE'];
        const filteredPlayers = filterPlayers(players, positions);
        const data = {
            team: team,
            overall: averagePlayerRating(filteredPlayers),
            players: filteredPlayers,
        }

        res.status(200).json(data);
    } catch(error) {
        res.status(500).send('Server error querying database!');
    }
})

app.get('/team/:team', async (req, res) => {
    const team = req.params.team;
    res.send(team);
})




