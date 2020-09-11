import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { API } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChamps, fetchSpells } from '../actions';

export const UserInfo = () => {
    const region = useSelector(state => state.regionStore);
    const { isLoading, champs } = useSelector(state => state.champStore);
    const { spells } = useSelector(state => state.spellStore);
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
    const [spellsData, setSpellsData] = useState();

    const champImages = [];
    const spellsArr = [];
    const [information, setInformation] = useState([]);

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
        dispatch(fetchSpells());
    }, [dispatch]);

    useEffect(() => {
        setChampsData(Object.values(champs))
        setSpellsData(Object.values(spells));
    }, [champs, spells])

    useEffect(() => {


        if (!isLoading && summonerDetail) {
            console.log(summonerDetail);
            console.log(champsData);
            const a = summonerDetail.map((data) => data.championId);
            const b = champsData.map((data) => data.key);
            console.log(a);
            console.log(b);
            for (let i = 0; i < 10; i++) {

                spellsArr.push({
                    spell1: summonerDetail[i].spell1Id,
                    spell2: summonerDetail[i].spell2Id,
                });

            }
            console.log(spellsData);
            console.log(spellsArr);

            const k = spellsArr.map(spell => {
                // console.log(Object.entries(spell));
                const obj = {}
                for (const [key, value] of Object.entries(spell)) {
                    obj[key] = spellsData.find(data => Number(data.key) === value).id;
                }
                // console.log(obj)
                return obj
            });
            console.log(k);


            for (let i = 0; i < 150; i++) {
                for (let j = 0; j < 10; j++) {
                    if (Number(champsData[i].key) === summonerDetail[j].championId) {
                        console.log('같은거 있음')
                        champImages.push(
                            {
                                champImage: champsData[i].image.full,
                                item0: summonerDetail[j].stats.item0,
                                item1: summonerDetail[j].stats.item1,
                                item2: summonerDetail[j].stats.item2,
                                item3: summonerDetail[j].stats.item3,
                                item4: summonerDetail[j].stats.item4,
                                item5: summonerDetail[j].stats.item5,
                                item6: summonerDetail[j].stats.item6,
                                spell1: k[j].spell1,
                                spell2: k[j].spell2,
                                gold: summonerDetail[j].stats.goldEarned,
                                ward: summonerDetail[j].stats.wardPlaced,
                                kills: summonerDetail[j].stats.kills,
                                assists: summonerDetail[j].stats.assists,
                                deaths: summonerDetail[j].stats.deaths,
                                minionKillded: summonerDetail[j].stats.totalMinionsKilled,
                                rate: ((summonerDetail[j].stats.kills + summonerDetail[j].stats.assists) / summonerDetail[j].stats.deaths).toFixed(2),
                                gameResult: result[j] ? 'Win' : 'Defeat',
                            }
                        )
                    }
                }
            }
            setInformation(champImages);
            console.log(champImages);
        }

    }, [champsData, summonerDetail])

    return (
        <>
            <div>
                <h2>user information</h2>
                {
                    information.map((data, index) => {
                        return (
                            <div key={index}>
                                <span>{data.gameResult}</span>
                                <img src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.champImage}`} alt="images" />
                                <img src={`${API.GET_ITEMS_IMG}/${data.item0}.png`} alt="images" />
                                <img src={`${API.GET_ITEMS_IMG}/${data.item1}.png`} alt="images" />
                                <img src={`${API.GET_ITEMS_IMG}/${data.item2}.png`} alt="images" />
                                <img src={`${API.GET_ITEMS_IMG}/${data.item3}.png`} alt="images" />
                                <img src={`${API.GET_ITEMS_IMG}/${data.item4}.png`} alt="images" />
                                <img src={`${API.GET_ITEMS_IMG}/${data.item5}.png`} alt="images" />
                                <img src={`${API.GET_ITEMS_IMG}/${data.item6}.png`} alt="images" />
                                <img src={`${API.GET_SPELLS_IMG}/${data.spell1}.png`} alt="images" />
                                <img src={`${API.GET_SPELLS_IMG}/${data.spell2}.png`} alt="images" />
                                <span>Gold: {data.gold}</span>
                                <span> KDA: {`${data.kills} / ${data.deaths} / ${data.assists}`}</span>
                                <span> Rate: {data.rate}</span>
                                <span> CS: {data.minionKillded}</span>



                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}





