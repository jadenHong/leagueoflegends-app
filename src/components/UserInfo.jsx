import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { API } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChamps } from '../actions';

export const UserInfo = () => {
    const region = useSelector(state => state.regionStore);
    const { isLoading, champs } = useSelector(state => state.champStore);
    const location = useLocation();
    console.log(location.state)
    const accountId = location.state.accountId;
    console.log(accountId)
    const [matchesInfo, setMatchesInfo] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [...gameIds] = location.state.gameIdInfo;
    const matchesData = [];
    const [summonerDetail, setSummonerDetail] = useState();
    const [result, setResult] = useState();
    const dispatch = useDispatch();
    const [champsData, setChampsData] = useState();

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
            setSummonerDetail(summonorMathDetail);

            const playResult = summonorMathDetail.map((data) => data.stats.win)
            console.log(playResult);
            setResult(playResult);

        }
        // setUserInfo(matchesInfo[0].participantIdentities.filter(((data) => data.player.accountId === accountId && <div>{data.player.summonerName}</div>)))
        // setLoaded(false)
    }, [matchesInfo, loaded])
    // const { gameDuration, gameMode, participantIdentities, participants, teams } = matchesInfo;

    useEffect(() => {
        dispatch(fetchChamps());
    }, [dispatch]);

    useEffect(() => {
        setChampsData(Object.values(champs))
    }, [champs])

    useEffect(() => {
        if (!isLoading && summonerDetail) {
            console.log(summonerDetail);
            console.log(champsData);
            const a = champsData.filter((data) => data.id === summonerDetail.map((data) => data.championId));
            console.log(a);
        }
        // champsData.filter((data2) => data2.id === data.championId)
    }, [champsData, summonerDetail])

    return (
        <>
            <div>
                <h2>user information</h2>
                {
                    result && loaded && summonerDetail &&

                    <div>
                        <div>

                            {
                                summonerDetail.map((data, index) => {
                                    return (
                                        <div key={index} style={{ border: "2px solid black" }}>
                                            <div>{data.championId}</div>
                                            <div>{data.spell1Id}</div>
                                            <div>{data.spell2Id}</div>
                                            <div>{data.stats.item0}</div>
                                            <div>{data.stats.item1}</div>
                                            <div>{data.stats.item2}</div>
                                            <div>{data.stats.item3}</div>
                                            <div>{data.stats.item4}</div>
                                            <div>{data.stats.item5}</div>
                                            <div>{data.stats.item6}</div>
                                            <div>{data.stats.goldEarned}</div>
                                            <div>{data.stats.wardsPlaced}</div>
                                            <div>{`${data.stats.kills} / ${data.stats.assists} / ${data.stats.deaths}`}</div>
                                            <div>{data.stats.totalMinionsKilled}</div>

                                        </div>
                                    )
                                })
                            }

                            {/* {result.map((data, index) => {
                                return (
                                    <div key={index}>{data ? '승리' : '패배'}</div>
                                )
                            })} */}

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