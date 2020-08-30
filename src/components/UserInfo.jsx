import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { API } from '../config';
import { useSelector } from 'react-redux';

export const UserInfo = () => {
    const region = useSelector(state => state.regionStore);
    const location = useLocation();
    console.log(location.state)
    const [matchesInfo, setMatchesInfo] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [...gameIds] = location.state.gameIdInfo;
    const matchesData = [];

    useEffect(() => {
        (
            async () => {
                for (let i = 0; i < 1; i++) {
                    const response = await fetch(`${API.GET_MATCH_DETAILS}/${gameIds[i]}?region=${region}`);
                    const data = await response.json();
                    // console.log(data);
                    // setMatchesInfo([
                    //     ...matchesInfo,
                    //     ...data,
                    // ]);
                    matchesData.push(data);

                }
                setMatchesInfo(matchesData);
                setLoaded(true);
            }
        )();
    }, [])
    useEffect(() => {
        console.log(matchesInfo[0])
        // setLoaded(false)
    }, [matchesInfo])
    // const { gameDuration, gameMode, participantIdentities, participants, teams } = matchesInfo;
    return (
        <>
            <div>
                <h2>user information</h2>
                {
                    loaded &&

                    <div>
                        {matchesInfo[0].participantIdentities.map((data) => {
                            return (

                                <div>{data.player.summonerName}</div>

                            )

                        })}
                    </div>

                }
            </div>

        </>
    )
}