import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchChamps } from '../actions';
import { API } from '../config';

export const UserMasteries = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const region = useSelector(state => state.regionStore);
    const { isLoading, champs } = useSelector(state => state.champStore)
    console.log(location);
    const id = location.state.id;
    const [masteryData, setMasteryData] = useState();
    const [allChampsData, setAllChampsData] = useState();
    const [champId, setChampId] = useState();

    useEffect(() => {
        (
            async () => {
                // server 측에 path 가 '/' 이곳으로 들어와서 프록시 서버를 통해서 정보를 호출한다.
                const response = await fetch(`${API.GET_MASTERY}/${id}?region=${region}`);
                const data = await response.json();
                console.log(data);
                setMasteryData(data);
                // const champId = data.map((data) => data.championId);

            }
        )();
    }, []);

    useEffect(() => {
        dispatch(fetchChamps());
    }, [dispatch])

    useEffect(() => {
        setAllChampsData(Object.values(champs))

    }, [champs])

    useEffect(() => {
        if (masteryData) {
            console.log(allChampsData)
            setChampId(masteryData.map((data) => data.championId));

            allChampsData.map((id) => {
                const obj = {};
                for (let value in id.key) {
                
                }
                return obj;
            }
            )
        }
    }, [masteryData])

    // useEffect(() => {
    //     if (allChampsData) {
    //         allChampsData.map((id) =>
    //             // const obj = {};
    //             console.log(Object.entries(id.championId))
    //         )
    //     }
    // }, [allChampsData])

    return (
        <>
            {console.log(champId)}
            <h2>user masteries page</h2>
        </>
    )
}