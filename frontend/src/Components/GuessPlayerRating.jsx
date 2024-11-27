
import {useEffect, useState} from "react";
import {fetchRandomPlayer} from "../maddenAPI.js";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GuessPlayerRating() {
    const [value, setValue] = useState(null);
    const [player, setPlayer] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        console.log('use effect running');
        fetchRandomPlayer().then(data => {
            setPlayer(data);
        });
    },[]);

    useEffect(() => {
        if (player !== null) {
            const rand = getRandomInt(1, 5);
            const over = getRandomInt(1, 2) === 1;
            const newValue = (over) ? player.rating + rand : player.rating - rand;
            setValue(newValue);
        }
    }, [player])



    function handleClick(over) {
        if (player !== null) {
            if ((over && value > player.rating || (!over && value < player.rating))) {
                setScore(prev => prev + 1);
            } else {
                //setScore(prev => prev - 1);
            }

            fetchRandomPlayer().then(data => {
                setPlayer(data);
            });
        }
    }

    function renderPlayer() {
        if (player === null) {
            return <div className='guess-rating-container'></div>
        }
        return (
            <div className="player">
                <h3>{`${player.name} (${player.position})`}</h3>
                <img alt={player.name} src={player.image}></img>
                <h3>{value}</h3>
            </div>
        )
    }

    const getScoreStyle = () => {
        return (score > 0) ? {color: 'green'} : {color: 'red'}
    }

    return (
        <>
            <h1 style={{textAlign: 'center'}}>Madden Over Under</h1>

            <div className="guess-rating-container ">
                <h1 style={getScoreStyle()}>{`Score: ${score}`}</h1>
                {renderPlayer()}
                <div className='button-container'>
                    <button onClick={() => handleClick(true)}>OVER</button>
                    <button onClick={() => handleClick(false)}>UNDER</button>
                </div>
                <button onClick={() => setScore(0)}>reset</button>
            </div>
        </>

    )
}

export default GuessPlayerRating;