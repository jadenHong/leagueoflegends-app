import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { API } from '../config';

export const Search = () => {
    const [summonerID, setSummonerID] = useState('');

    const handleChange = (e) => {
        const newInput = e.target.value;
        setSummonerID(newInput);
    }
    // https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/
    const handleClick = async () => {
        if (summonerID.length > 0) {
            const response = await fetch(`${API.GET_SUMMONER_BY_NAME}/${summonerID}?region=kr`);
            const data = await response.json();
            console.log(data);
        }
    }

    return (
        <div className="wrap">
            <div className="search">
                <input type="text" className="summoner-id" placeholder="Summoner ID" onChange={e => setSummonerID(e.target.value)} value={summonerID} />
                <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={handleChange} />
                <button type="submit" className="searchButton" onClick={handleClick}>
                    <FaSearch />
                </button>
            </div>
        </div>
    )
}