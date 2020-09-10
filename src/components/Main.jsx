import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { API } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChamps } from '../actions';
import { Link } from 'react-router-dom'


export const Main = () => {

    // const region = useSelector(state => state.regionStore);
    const champs = useSelector(state => state.champStore);
    const [champsData, setChampsData] = useState();
    const [summonerID, setSummonerID] = useState('');
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const newInput = e.target.value;
        setSummonerID(newInput);
    }

    useEffect(() => {
        console.log('dispatch 실행')
        dispatch(fetchChamps());
        // setChamps(Object.values(data));
        console.log(champs)
        console.log('dispatch 끝')
    }, [dispatch])

    return (
        <div className="search">
            {/* <input type="text" className="summoner-id" placeholder="Enter the Summoner's ID" onChange={e => setSummonerID(e.target.value)} value={summonerID} /> */}
            <input type="text" className="searchTerm" placeholder="Enter the Summoner's ID" onChange={handleChange} />
            <Link to="/search" type="submit" className="searchButton">
                <FaSearch />
            </Link>
            {
                champs &&
                console.log(champs)}
        </div>
    )
}