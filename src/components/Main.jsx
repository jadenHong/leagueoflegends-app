import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
// import { API } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChamps } from '../actions';
import { Link } from 'react-router-dom'


export const Main = () => {

    // const region = useSelector(state => state.regionStore);
    const { isLoading, champs } = useSelector(state => state.champStore);
    const [champsData, setChampsData] = useState();
    const dispatch = useDispatch();



    useEffect(() => {
        console.log('dispatch 실행')
        dispatch(fetchChamps());
        console.log('dispatch 끝')
    }, [dispatch])

    useEffect(() => {
        setChampsData(Object.values(champs));
    }, [champs])

    return (
        <div className="search">

            {
                !isLoading &&
                console.log(champsData)}
        </div>
    )
}