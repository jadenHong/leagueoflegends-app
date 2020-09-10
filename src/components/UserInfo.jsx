import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { API } from '../config';
import { useSelector } from 'react-redux';

export const UserInfo = () => {
    const region = useSelector(state => state.regionStore);
    const location = useLocation();
    console.log(location.state)
    const accountId = location.state.accountId;
    console.log(accountId)
    const [matchesInfo, setMatchesInfo] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [...gameIds] = location.state.gameIdInfo;
    const matchesData = [];
    const [userInfo, setUserInfo] = useState();
    const [result, setResult] = useState();

    useEffect(() => {
        (
            async () => {
                for (let i = 0; i < 10; i++) {
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
        if (loaded) {
            console.log('matchesinfo check')
            console.log(matchesInfo)




            const participantId = matchesInfo.map((data) => data.participantIdentities.filter((data) => data.player.accountId === accountId)[0].participantId);
            console.log(participantId);
            const summonorMathDetail = matchesInfo.map((data, index) => data.participants.filter((data) => data.participantId === participantId[index])[0])
            console.log(summonorMathDetail);
            const playResult = summonorMathDetail.map((data) => data.stats.win)
            console.log(playResult);
            setResult(playResult);

        }
        // setUserInfo(matchesInfo[0].participantIdentities.filter(((data) => data.player.accountId === accountId && <div>{data.player.summonerName}</div>)))
        // setLoaded(false)
    }, [matchesInfo, loaded])
    // const { gameDuration, gameMode, participantIdentities, participants, teams } = matchesInfo;



    return (
        <>
            <div>
                <h2>user information</h2>
                {
                    result && loaded &&

                    <div>
                        <div>
                            {/* {console.log(matchesInfo[0])} */}
                            {result.map((data, index) => {
                                return (
                                    <div key={index}>{data ? '승리' : '패배'}</div>
                                )
                            })}

                        </div>

                        <div>
                            {matchesInfo[0].participantIdentities.map((data, index) => {
                                return (

                                    <div key={index}>{data.player.summonerName}</div>

                                )

                            })}
                        </div>
                    </div>
                }
            </div>

        </>
    )
}