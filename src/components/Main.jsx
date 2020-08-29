import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { API } from '../config';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


export const Main = () => {

    const region = useSelector(state => state.regionStore);
    const [summonerID, setSummonerID] = useState('');


    const handleChange = (e) => {
        const newInput = e.target.value;
        setSummonerID(newInput);
    }

    return (
        <div className="search">
            {/* <input type="text" className="summoner-id" placeholder="Enter the Summoner's ID" onChange={e => setSummonerID(e.target.value)} value={summonerID} /> */}
            <input type="text" className="searchTerm" placeholder="Enter the Summoner's ID" onChange={handleChange} />
            <Link to="/search" type="submit" className="searchButton">
                <FaSearch />
            </Link>
        </div>
    )
}