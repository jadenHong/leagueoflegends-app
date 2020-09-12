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
    const [masteryChamps, setMasteryChamps] = useState();
    const masteryArr = [];
    const [masteryLastInfo, setMasteryLastInfo] = useState();
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

        }
    }, [masteryData]);

    useEffect(() => {
        if (champId) {
            let arr = [];

            // champId.map((data) => {
            //     const obj = {};
            //     for (let [key, value] of Object.entries(allChampsData)) {
            //         // console.log(value)
            //         obj[key] = allChampsData.find((data) => data === Number(value.key));
            //     }

            //     // setMasteryChamps(arr);
            //     arr.push(obj);
            // })
            // console.log(arr)


            champId.map((data) => {
                const obj = {};
                for (let value of allChampsData) {

                    if (data === Number(value.key)) {
                        arr.push({
                            id: value.id,
                            name: value.name,
                        });
                    }
                }

                return setMasteryChamps(arr);
            })

            //     champId.map((data) => {

            //         for (let value of allChampsData) {

            //             if (data === Number(value.key)) {
            //                 arr.push(value.id);
            //             }
            //         }
            //         setMasteryChamps(arr);
            //     })
        }
    }, [champId])

    useEffect(() => {
        console.log(masteryChamps)
        if (masteryChamps) {
            for (let i = 0; i < masteryChamps.length; i++) {
                masteryArr.push({
                    championId: masteryChamps[i].id,
                    championName: masteryChamps[i].name,
                    championLevel: masteryData[i].championLevel,
                    championPoints: masteryData[i].championPoints,
                    lastPlayTime: masteryData[i].lastPlayTime,
                })
            }
            console.log(masteryArr);
            setMasteryLastInfo(masteryArr);
        }

    }, [masteryChamps])

    return (
        <>
            <h2>user masteries page</h2>
            <div>
                {
                    masteryLastInfo &&
                    masteryLastInfo.map((data, index) => {
                        return (
                            <div key={index}>
                                <img src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.championId}.png`} alt="champImage" />
                                <span>Name: {data.championName}</span>
                                <span> Level: {data.championLevel}</span>
                                <span> Points: {data.championPoints}</span>


                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}