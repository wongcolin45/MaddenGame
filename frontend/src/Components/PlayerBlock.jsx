
import {useEffect, useState} from "react";
import fetchRandomPlayer from "../PlayersAPI.js";

function PlayerBlock() {
    const [player, setPlayer] = useState(null);

    const [start, setStart] = useState(false);

    useEffect(() => {

    },[start])


    async function handleClick() {
        const data = await fetchRandomPlayer();
        console.log(data);
        setPlayer(data);
    }

    function renderPlayer() {
        if (player === null) {
            return (
                <></>
            )
        }
        return (
            <>
                <img src={player.image}></img>
                <h1>{player.name}</h1>
            </>
        )
    }

    return (

        <button className="player-block" onClick={handleClick}>
            {renderPlayer()}
        </button>


    )

}

export default PlayerBlock;