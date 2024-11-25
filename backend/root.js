
const {getRandomPlayer} = require('./Services/PlayerService');

const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());

app.get('/', (req, res) => {
    res.send('Madden API up and running!/')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/players/random', async (req, res) => {
    try {
        const player = await getRandomPlayer();
        console.log(player);
        res.status(200).json(player);
    } catch (error) {
        res.status(500).send('Server error querying database!');
    }
})