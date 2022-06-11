import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [searchText, setSearchText] = useState("");
    const [gameList, setgameList] = useState([]);

    function getPlayerGames() {
        axios.get("http://localhost:4000/past5Games", { params: { username: searchText } })
            .then(response => {
                setgameList(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className='App'>
            <h1>League Of Leagends</h1>
            <p>Players last 5 games</p>
            <input type="text" className='searchbar' name='search' onChange={e => setSearchText(e.target.value)} placeholder='choose your username'/>
            <button className='buttonsearchbar' onClick={getPlayerGames}>Search</button>
            {gameList.length !== 0 ?
                <>
                    {gameList.map((gameData, index) =>
                        <>
                            <h2>Game {index + 1}</h2>
                            <div className='card'>
                                {gameData.info.participants.map((data, participantIndex) =>
                                    <p>PLAYER {participantIndex + 1}: {data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists}</p>
                                )}
                            </div>
                        </>
                    )
                    }
                </>
                :
                <>
                    <p>No Player </p>
                </>
            }
        </div>
    );
}

export default App;