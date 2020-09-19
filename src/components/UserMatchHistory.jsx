

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { API } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChamps, fetchRunes, fetchSpells } from '../actions';
import { Accordion, Card, Button } from 'react-bootstrap';
import { MatchedGameDetail } from './MatchedGameDetail';
import userbackground from '../images/userbackground.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import darkgrey from '../images/darkgrey.png';
import { Loading } from './Loading';

export const UserMatchHistory = () => {
    const region = useSelector(state => state.regionStore);
    const { isLoading, champs } = useSelector(state => state.champStore);
    const { spells } = useSelector(state => state.spellStore);
    const { runes } = useSelector(state => state.runeStore);
    const location = useLocation();
    const [pageLoading, setPageLoading] = useState(true);
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
    const [allChampsData, setAllChampsData] = useState();
    const [allSpellsData, setAllSpellsData] = useState();
    const [allRunesData, setAllRunesData] = useState();

    const champImages = [];
    const spellsArr = [];
    const runesArr = [];
    const [information, setInformation] = useState([]);

    useEffect(() => {
        (
            async () => {
                for (let i = 0; i < 10; i++) {
                    // server 측에 path 가 '/' 이곳으로 들어와서 프록시 서버를 통해서 정보를 호출한다.
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
        dispatch(fetchRunes());
    }, [dispatch]);

    useEffect(() => {
        setAllChampsData(Object.values(champs))
        setAllSpellsData(Object.values(spells));
        setAllRunesData(runes);
    }, [champs, spells, runes]);

    useEffect(() => {


        if (!isLoading && summonerDetail) {
            console.log(summonerDetail);
            console.log(allChampsData);
            console.log(allRunesData);

            const a = summonerDetail.map((data) => data.championId);
            const b = allChampsData.map((data) => data.key);

            console.log(a);
            console.log(b);
            for (let i = 0; i < 10; i++) {

                spellsArr.push({
                    spell1: summonerDetail[i].spell1Id,
                    spell2: summonerDetail[i].spell2Id,
                });

            }
            console.log(allSpellsData);
            console.log(spellsArr);

            for (let i = 0; i < 10; i++) {
                runesArr.push({
                    primaryRune: summonerDetail[i].stats.perkPrimaryStyle,
                    subRune: summonerDetail[i].stats.perkSubStyle,
                })
            };
            console.log(runesArr);

            // 해당하는 룬 뽑는 함수
            const usedRunes = runesArr.map(rune => {
                const obj = {};
                for (const [key, value] of Object.entries(rune)) {
                    obj[key] = allRunesData.find(data => data.id === value).icon;
                }
                return obj
            });
            console.log(usedRunes);

            // 해당하는 스펠 뽑는 함수
            const usedSpells = spellsArr.map(spell => {
                // console.log(Object.entries(spell));
                const obj = {}
                for (const [key, value] of Object.entries(spell)) {
                    obj[key] = allSpellsData.find(data => Number(data.key) === value).id;
                }
                // console.log(obj)
                return obj
            });
            console.log(usedSpells);

            console.log(matchesInfo);

            for (let i = 0; i < 150; i++) {
                for (let j = 0; j < 10; j++) {
                    if (Number(allChampsData[i].key) === summonerDetail[j].championId) {
                        console.log('같은거 있음')

                        champImages.push(
                            {
                                createdGame: matchesInfo[j].gameCreation,
                                gameDuration: matchesInfo[j].gameDuration,
                                teams: matchesInfo[j].teams,
                                gameId: matchesInfo[j].gameId,
                                champImage: allChampsData[i].image.full,
                                item0: summonerDetail[j].stats.item0,
                                item1: summonerDetail[j].stats.item1,
                                item2: summonerDetail[j].stats.item2,
                                item3: summonerDetail[j].stats.item3,
                                item4: summonerDetail[j].stats.item4,
                                item5: summonerDetail[j].stats.item5,
                                item6: summonerDetail[j].stats.item6,
                                spell1: usedSpells[j].spell1,
                                spell2: usedSpells[j].spell2,
                                gold: summonerDetail[j].stats.goldEarned,
                                ward: summonerDetail[j].stats.wardPlaced,
                                kills: summonerDetail[j].stats.kills,
                                assists: summonerDetail[j].stats.assists,
                                deaths: summonerDetail[j].stats.deaths,
                                minionKillded: summonerDetail[j].stats.totalMinionsKilled,
                                rate: ((summonerDetail[j].stats.kills + summonerDetail[j].stats.assists) / summonerDetail[j].stats.deaths).toFixed(2),
                                gameResult: result[j] ? 'Win' : 'Defeat',
                                level: summonerDetail[j].stats.champLevel,
                                mainRune: usedRunes[j].primaryRune,
                                subRune: usedRunes[j].subRune,

                            }
                        )
                    }
                }
            }
            setInformation(champImages);
            setPageLoading(false);
            console.log(champImages);
        }

    }, [allChampsData, summonerDetail])

    // 게임 언제 했는지 뽑아내는 함수
    const getPlayGameDate = (unixTime) => {
        const timeGap = new Date() - unixTime;
        let stime = parseInt(timeGap / 1000);
        const year = parseInt(86400 * (365.25));
        const month = parseInt(86400 * 30.4375);
        const day = 86400;
        const hour = 3600;
        const min = 60;

        if (stime >= year) return (`${parseInt(stime / year) === 1 ? `${parseInt(stime / year)} year ago` : `${parseInt(stime / year)} years ago`}`);
        if (stime >= month) return (`${parseInt(stime / month) === 1 ? `${parseInt(stime / month)} month ago` : `${parseInt(stime / month)} months ago`}`);
        if (stime >= day) return (`${parseInt(stime / day) === 1 ? `${parseInt(stime / day)} day ago` : `${parseInt(stime / day)} days ago`}`);
        if (stime >= hour) return (`${parseInt(stime / hour) === 1 ? `${parseInt(stime / hour)} hour ago` : `${parseInt(stime / hour)} hours ago`}`);
        return parseInt(stime / min) + "minutes ago";
    }

    // 게임 시간 뽑아내는 함수
    const getPlayDuration = (duration) => {
        if (duration >= 3600) {
            const hours = Math.floor(duration / 3600);
            const minutes = Math.floor((duration - 3600) / 60);
            const seconds = duration - 3600 - (minutes * 60);
            return (
                `${hours === 1 ? hours + ' hour' : hours + ' hours'} ${minutes === 1 ? minutes + ' min' : minutes + ' mins'} ${seconds === 1 || seconds === 0 ? seconds + ' sec' : seconds + ' secs'}`
            )
        } else {
            const minutes = Math.floor(duration / 60);
            const seconds = duration - (minutes * 60);
            return (
                ` ${minutes === 1 ? minutes + ' min' : minutes + ' mins'} ${seconds === 1 || seconds === 0 ? seconds + ' sec' : seconds + ' secs'}`
            )
        }
    }

    return (
        <>
            <div className={pageLoading ? 'laoding-page' : 'matchHistory-page'}>
                {
                    pageLoading ?
                        <div className="loading" >
                            <Loading />
                        </div>
                        :
                        // allChampsData && allRunesData && allSpellsData &&
                        information.map((data, index) => {
                            return (
                                <div className="accordion-page">
                                    <Accordion key={index} className="accordion">
                                        <div className="card">
                                            <div className={`card-header ${data.gameResult === 'Win' ? 'win' : 'lose'} `}>
                                                <Accordion.Toggle as={Button} variant="link" eventKey={data.gameId} className="accordion-toggle link">
                                                    <div className="first-info">
                                                        <span className="created-game">{getPlayGameDate(data.createdGame)}</span>
                                                        <span className="game-duration">{getPlayDuration(data.gameDuration)}</span>
                                                        <span className="game-result">{data.gameResult}</span>
                                                    </div>
                                                    <div className="second-info">
                                                        <div className="level-champ">
                                                            <span className="level">{data.level}</span>
                                                            <img className="champ-image" src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.champImage}`} alt="images" />
                                                        </div>
                                                        <div className="spells-runes">
                                                            <div className="spells">
                                                                <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${data.spell1}.png`} alt="images" /></span>
                                                                <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${data.spell2}.png`} alt="images" /></span>
                                                            </div>
                                                            <div className="runes">
                                                                <span><img className="rune" src={`${API.GET_RUNES_IMG}/${data.mainRune}`} alt="images" /></span>
                                                                <span><img className="rune" src={`${API.GET_RUNES_IMG}/${data.subRune}`} alt="images" /></span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="third-info">
                                                        <span className="gold">{data.gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} G</span> {/* 골드 세칸당 콤마(,) 찍는 함수 */}
                                                        <span className="rate">{data.rate}</span>
                                                        <div className="kda">
                                                            <span className="kills">{data.kills}</span> / <span className="deaths">{data.deaths}</span> / <span className="assists">{data.deaths}</span>
                                                        </div>
                                                        <span className="cs">{data.minionKillded} ({`${(data.minionKillded / 60).toFixed(1)}`}) CS</span>
                                                    </div>

                                                    <div className="forth-info">
                                                        <div>
                                                            {data.item0 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item0}.png`} alt="images" /></span>}
                                                            {data.item1 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item1}.png`} alt="images" /></span>}
                                                            {data.item2 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item2}.png`} alt="images" /></span>}
                                                        </div>
                                                        <div>
                                                            {data.item3 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item3}.png`} alt="images" /></span>}
                                                            {data.item4 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item4}.png`} alt="images" /></span>}
                                                            {data.item5 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span> <img className="item" src={`${API.GET_ITEMS_IMG}/${data.item5}.png`} alt="images" /></span>}
                                                            {data.item6 === 0 ? <span><img className="item" src={darkgrey} alt="empty" /></span> : <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item6}.png`} alt="images" /></span>}
                                                        </div>
                                                    </div>



                                                </Accordion.Toggle>
                                            </div>
                                            <Accordion.Collapse eventKey={data.gameId}>
                                                <div className="card-body"><MatchedGameDetail clickedData={data} matchesInfo={matchesInfo[index]} allChampsData={allChampsData} allSpellsData={allSpellsData} allRunesData={allRunesData} /></div>
                                            </Accordion.Collapse>
                                        </div>

                                    </Accordion>
                                </div>
                            )
                        })
                }
            </div>

        </>
    )
}
































// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
// import { API } from '../config';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchChamps, fetchRunes, fetchSpells } from '../actions';
// import { Accordion, Card, Button } from 'react-bootstrap';
// import { MatchedGameDetail } from './MatchedGameDetail';
// import userbackground from '../images/userbackground.jpg';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export const UserMatchHistory = () => {
//     const region = useSelector(state => state.regionStore);
//     const { isLoading, champs } = useSelector(state => state.champStore);
//     const { spells } = useSelector(state => state.spellStore);
//     const { runes } = useSelector(state => state.runeStore);

//     const location = useLocation();
//     console.log(location.state)
//     const accountId = location.state.accountId;
//     console.log(accountId)
//     const [matchesInfo, setMatchesInfo] = useState([]);
//     const [loaded, setLoaded] = useState(false);
//     const [...gameIds] = location.state.gameIdInfo;
//     const matchesData = [];
//     const [summonerDetail, setSummonerDetail] = useState();
//     const [result, setResult] = useState();

//     const dispatch = useDispatch();
//     const [allChampsData, setAllChampsData] = useState();
//     const [allSpellsData, setAllSpellsData] = useState();
//     const [allRunesData, setAllRunesData] = useState();

//     const champImages = [];
//     const spellsArr = [];
//     const runesArr = [];
//     const [information, setInformation] = useState([]);

//     useEffect(() => {
//         (
//             async () => {
//                 for (let i = 0; i < 10; i++) {
//                     // server 측에 path 가 '/' 이곳으로 들어와서 프록시 서버를 통해서 정보를 호출한다.
//                     const response = await fetch(`${API.GET_MATCH_DETAILS}/${gameIds[i]}?region=${region}`);
//                     const data = await response.json();
//                     // console.log(data);
//                     // setMatchesInfo([ 
//                     //     ...matchesInfo,
//                     //     ...data,
//                     // ]);
//                     matchesData.push(data);

//                 }
//                 setMatchesInfo(matchesData);
//                 setLoaded(true);
//             }
//         )();
//     }, [])
//     useEffect(() => {
//         if (loaded) {
//             console.log('matchesinfo check')
//             console.log(matchesInfo)
//             const participantId = matchesInfo.map((data) => data.participantIdentities.filter((data) => data.player.accountId === accountId)[0].participantId);
//             console.log(participantId);
//             const summonorMathDetail = matchesInfo.map((data, index) => data.participants.filter((data) => data.participantId === participantId[index])[0])
//             console.log(summonorMathDetail);
//             setSummonerDetail(summonorMathDetail);

//             const playResult = summonorMathDetail.map((data) => data.stats.win)
//             console.log(playResult);
//             setResult(playResult);

//         }
//         // setUserInfo(matchesInfo[0].participantIdentities.filter(((data) => data.player.accountId === accountId && <div>{data.player.summonerName}</div>)))
//         // setLoaded(false)
//     }, [matchesInfo, loaded])
//     // const { gameDuration, gameMode, participantIdentities, participants, teams } = matchesInfo;

//     useEffect(() => {
//         dispatch(fetchChamps());
//         dispatch(fetchSpells());
//         dispatch(fetchRunes());
//     }, [dispatch]);

//     useEffect(() => {
//         setAllChampsData(Object.values(champs))
//         setAllSpellsData(Object.values(spells));
//         setAllRunesData(runes);
//     }, [champs, spells, runes]);

//     useEffect(() => {


//         if (!isLoading && summonerDetail) {
//             console.log(summonerDetail);
//             console.log(allChampsData);
//             console.log(allRunesData);

//             const a = summonerDetail.map((data) => data.championId);
//             const b = allChampsData.map((data) => data.key);

//             console.log(a);
//             console.log(b);
//             for (let i = 0; i < 10; i++) {

//                 spellsArr.push({
//                     spell1: summonerDetail[i].spell1Id,
//                     spell2: summonerDetail[i].spell2Id,
//                 });

//             }
//             console.log(allSpellsData);
//             console.log(spellsArr);

//             for (let i = 0; i < 10; i++) {
//                 runesArr.push({
//                     primaryRune: summonerDetail[i].stats.perkPrimaryStyle,
//                     subRune: summonerDetail[i].stats.perkSubStyle,
//                 })
//             };
//             console.log(runesArr);

//             // 해당하는 룬 뽑는 함수
//             const usedRunes = runesArr.map(rune => {
//                 const obj = {};
//                 for (const [key, value] of Object.entries(rune)) {
//                     obj[key] = allRunesData.find(data => data.id === value).icon;
//                 }
//                 return obj
//             });
//             console.log(usedRunes);

//             // 해당하는 스펠 뽑는 함수
//             const usedSpells = spellsArr.map(spell => {
//                 // console.log(Object.entries(spell));
//                 const obj = {}
//                 for (const [key, value] of Object.entries(spell)) {
//                     obj[key] = allSpellsData.find(data => Number(data.key) === value).id;
//                 }
//                 // console.log(obj)
//                 return obj
//             });
//             console.log(usedSpells);

//             console.log(matchesInfo);

//             for (let i = 0; i < 150; i++) {
//                 for (let j = 0; j < 10; j++) {
//                     if (Number(allChampsData[i].key) === summonerDetail[j].championId) {
//                         console.log('같은거 있음')

//                         champImages.push(
//                             {
//                                 createdGame: matchesInfo[j].gameCreation,
//                                 gameDuration: matchesInfo[j].gameDuration,
//                                 teams: matchesInfo[j].teams,
//                                 gameId: matchesInfo[j].gameId,
//                                 champImage: allChampsData[i].image.full,
//                                 item0: summonerDetail[j].stats.item0,
//                                 item1: summonerDetail[j].stats.item1,
//                                 item2: summonerDetail[j].stats.item2,
//                                 item3: summonerDetail[j].stats.item3,
//                                 item4: summonerDetail[j].stats.item4,
//                                 item5: summonerDetail[j].stats.item5,
//                                 item6: summonerDetail[j].stats.item6,
//                                 spell1: usedSpells[j].spell1,
//                                 spell2: usedSpells[j].spell2,
//                                 gold: summonerDetail[j].stats.goldEarned,
//                                 ward: summonerDetail[j].stats.wardPlaced,
//                                 kills: summonerDetail[j].stats.kills,
//                                 assists: summonerDetail[j].stats.assists,
//                                 deaths: summonerDetail[j].stats.deaths,
//                                 minionKillded: summonerDetail[j].stats.totalMinionsKilled,
//                                 rate: ((summonerDetail[j].stats.kills + summonerDetail[j].stats.assists) / summonerDetail[j].stats.deaths).toFixed(2),
//                                 gameResult: result[j] ? 'Win' : 'Defeat',
//                                 level: summonerDetail[j].stats.champLevel,
//                                 mainRune: usedRunes[j].primaryRune,
//                                 subRune: usedRunes[j].subRune,

//                             }
//                         )
//                     }
//                 }
//             }
//             setInformation(champImages);
//             console.log(champImages);
//         }

//     }, [allChampsData, summonerDetail])

//     // 게임 언제 했는지 뽑아내는 함수
//     const getPlayGameDate = (unixTime) => {
//         const timeGap = new Date() - unixTime;
//         let stime = parseInt(timeGap / 1000);
//         const year = parseInt(86400 * (365.25));
//         const month = parseInt(86400 * 30.4375);
//         const day = 86400;
//         const hour = 3600;
//         const min = 60;

//         if (stime >= year) return parseInt(stime / year) + "년 전";
//         if (stime >= month) return parseInt(stime / month) + "달 전";
//         if (stime >= day) return parseInt(stime / day) + "일 전";
//         if (stime >= hour) return parseInt(stime / hour) + "시간 전";
//         return parseInt(stime / min) + "분 전";
//     }

//     // 게임 시간 뽑아내는 함수
//     const getPlayDuration = (duration) => {
//         if (duration >= 3600) {
//             const hours = Math.floor(duration / 3600);
//             const minutes = Math.floor((duration - 3600) / 60);
//             const seconds = duration - 3600 - (minutes * 60);
//             return (
//                 `${hours}시간 ${minutes}분 ${seconds}초`
//             )
//         } else {
//             const minutes = Math.floor(duration / 60);
//             const seconds = duration - (minutes * 60);
//             return (
//                 `${minutes} 분 ${seconds} 초`
//             )
//         }
//     }

//     return (
//         <>

//             <div className="matchHistory-page">
//                 {
//                     // allChampsData && allRunesData && allSpellsData &&
//                     information.map((data, index) => {
//                         return (
//                             <Accordion key={index} className="accordion">
//                                 <Card className="card">
//                                     <Card.Header className="card-header">
//                                         <Accordion.Toggle as={Button} variant="link" eventKey={data.gameId} className="accordion-toggle">
//                                             <div className="first-info">
//                                                 <span className="created-game">{getPlayGameDate(data.createdGame)}</span>
//                                                 <span className="game-duration">{getPlayDuration(data.gameDuration)}</span>
//                                                 <span className="game-result">{data.gameResult}</span>
//                                             </div>
//                                             <div className="second-info">
//                                                 <div className="level-champ">
//                                                     <span className="level">Level: {data.level}</span>
//                                                     <img className="champ-image" src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.champImage}`} alt="images" />
//                                                 </div>
//                                                 <div className="spells-runes">
//                                                     <div className="spells">
//                                                         <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${data.spell1}.png`} alt="images" /></span>
//                                                         <span><img className="spell" src={`${API.GET_SPELLS_IMG}/${data.spell2}.png`} alt="images" /></span>
//                                                     </div>
//                                                     <div className="runes">
//                                                         <span><img className="rune" src={`${API.GET_RUNES_IMG}/${data.mainRune}`} alt="images" /></span>
//                                                         <span><img className="rune" src={`${API.GET_RUNES_IMG}/${data.subRune}`} alt="images" /></span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="third-info">
//                                                 <span className="gold">Gold: {data.gold}</span>
//                                                 <span className="kda"> KDA: {`${data.kills} / ${data.deaths} / ${data.assists}`}</span>
//                                                 <span className="rate"> Rate: {data.rate}</span>
//                                                 <span className="cs"> CS: {data.minionKillded}</span>
//                                             </div>

//                                             <div className="forth-info">
//                                                 <div>
//                                                     <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item0}.png`} alt="images" /></span>
//                                                     <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item1}.png`} alt="images" /></span>
//                                                     <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item2}.png`} alt="images" /></span>
//                                                 </div>
//                                                 <div>
//                                                     <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item3}.png`} alt="images" /></span>
//                                                     <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item4}.png`} alt="images" /></span>
//                                                     <span> <img className="item" src={`${API.GET_ITEMS_IMG}/${data.item5}.png`} alt="images" /></span>
//                                                     <span><img className="item" src={`${API.GET_ITEMS_IMG}/${data.item6}.png`} alt="images" /></span>
//                                                 </div>
//                                             </div>



//                                         </Accordion.Toggle>
//                                     </Card.Header>
//                                     <Accordion.Collapse eventKey={data.gameId}>
//                                         <Card.Body><MatchedGameDetail clickedData={data} matchesInfo={matchesInfo[index]} allChampsData={allChampsData} allSpellsData={allSpellsData} allRunesData={allRunesData} /></Card.Body>
//                                     </Accordion.Collapse>
//                                 </Card>

//                             </Accordion>
//                         )
//                     })
//                 }
//             </div>

//         </>
//     )
// }











































