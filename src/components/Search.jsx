import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { API } from '../config';

export const Search = () => {

    const [input, setInput] = useState('');

    const handleChange = (e) => {
        const newInput = e.target.value;
        setInput(newInput);
    }
    // https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/
    const handleClick = async () => {
        const response = await fetch(`${API.GET_SUMMONER_BY_NAME}?region=kr`);
        console.log(`${API.GET_SUMMONER_BY_NAME}?region=kr`);
        const data = response.json();
        console.log(data);
    }

    return (
        <div className="wrap">
            <div className="search">
                <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={handleChange} />
                <button type="submit" className="searchButton" onClick={handleClick}>
                    <FaSearch />
                </button>
            </div>
        </div>
    )
}