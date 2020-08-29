import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { API } from '../config';
import { useSelector } from 'react-redux';
import { Loading } from './Loading';

export const Search = () => {
    const region = useSelector(state => state.regionStore);
    const [summonerID, setSummonerID] = useState('');
    const [errorMsg, setErrorMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [{ id, name, profileIconId, level, accountId }, setSummonerInfo] = useState({
        id: undefined,
        name: '',
        profileIconId: 0,
        level: 0,
        accountId: undefined,
    });
    const [{ queueType, tier, rank, leaguePoints, wins, losses }, setSummonerDetail] = useState({
        queueType: '',
        tier: '',
        rank: '',
        leaguePoints: 0,
        wins: 0,
        losses: 0,

    });
    const gameId = [];
    const [matched, setMatched] = useState(false);

    const handleChange = (e) => {
        const newInput = e.target.value;
        setSummonerID(newInput);
    }
    // https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/
    const handleClick = async () => {
        if (summonerID.length > 0) {
            const response = await fetch(`${API.GET_SUMMONER_BY_NAME}/${summonerID}?region=${region}`);
            const data = await response.json();
            console.log(data.status);
            console.log(data);
            if (data.status === undefined) { // data를 뽑아오면 status 가 나타나지 않고 data가 없을경우에 data.status.status_code: 404 이런식으로 리턴 된다.
                console.log('data 있음')
                setErrorMsg(false)
                setSummonerInfo({
                    id: data.id,
                    name: data.name,
                    profileIconId: data.profileIconId,
                    level: data.summonerLevel,
                    accountId: data.accountId,
                });
            } else {
                console.log('data 없음')
                setErrorMsg(true);
            }
        }
    }

    useEffect(() => {
        if (!errorMsg)
            console.log('loading')
        setIsLoading(true);
    }, [id])

    //두번 setState를 불러 오게 되면 랜더링 때문에 문제가 발생한다. 그래서 의존성배열에 id값을 두고 id값이 변하게 되면 fetch를 통해 setState 를 하게 된다.
    useEffect(() => {
        if (id) {
            (async () => {
                // const response2 = await fetch(`${API.GET_SUMMONER_DETAIL_BY_ID}/18DGpAfpkizFV_QeZruhnqFhjao8lcwqhzHKxbOcqfFRXA`)
                console.log(id);
                const response = await fetch(`${API.GET_SUMMONER_DETAIL_BY_ID}/${id}?region=${region}`)
                console.log('3');
                const data = await response.json();
                console.log(data);
                const [details] = data;
                console.log(details);
                setSummonerDetail({
                    queueType: details.queueType,
                    tier: details.tier,
                    rank: details.rank,
                    leaguePoints: details.leaguePoints,
                    wins: details.wins,
                    losses: details.losses,
                })
            })();
        }
    }, [id]);

    useEffect(() => {
        console.log('match')
        if (tier) {
            (
                async () => {
                    console.log(accountId)
                    const response = await fetch(`${API.GET_MATCH_ID}/${accountId}?region=${region}`)
                    const data = await response.json();
                    const { matches } = data;
                    console.log(matches); // 배열안에 객체로 다 저장 되있어서 이부분 다시 해야함.

                    for (let i = 0; i < 100; i++) {
                        gameId.push(matches[i].gameId);
                    }
                    console.log(gameId);
                    setMatched(true);
                }
            )();
        }
    }, [tier]);

    useEffect(() => {
        console.log('matched: ' + matched)
        // 여기로 push가 다된 gameId 가 들어오지 않음......
        console.log(gameId)
        if (matched) {
            (
                async () => {
                    console.log('gameId: ' + gameId);
                    const response = await fetch(`${API.GET_MATCH_DETAILS}/${gameId}?region=${region}`);
                    const data = await response.json();
                    console.log(data);
                }
            )();
        }
    }, [matched])

    return (



        <div className="wrap">

            <div className="search">
                {/* <input type="text" className="summoner-id" placeholder="Enter the Summoner's ID" onChange={e => setSummonerID(e.target.value)} value={summonerID} /> */}
                <input type="text" className="searchTerm" placeholder="Enter the Summoner's ID" onChange={handleChange} />
                <button type="submit" className="searchButton" onClick={handleClick}>
                    <FaSearch />
                </button>
            </div>


            {!errorMsg ?
                (
                    !isLoading ?

                        <Loading />
                        :
                        <div className="summoner-info">
                            {
                                name.length > 0 && tier.length > 0 &&
                                <div>
                                    <img src={`${API.GET_PROFILEICON}/${profileIconId}.png`} alt="profileIcon" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
                                    <h2>{name}</h2>
                                    <h3>{level}</h3>
                                    <img src={require(`../images/ranked-emblems/${tier}.png`)} alt="tier-emblem" style={{ width: '100px', height: '100px' }} />
                                    <h3>{tier}</h3>
                                    <h3>{`Win: ${wins} losses: ${losses} Rate: ${Math.round(wins / (wins + losses) * 100)}%`}</h3>
                                    <h3>LP: {leaguePoints} LP</h3>
                                    <h3>{rank}</h3>
                                    <h3>{queueType}</h3>
                                </div>
                            }
                        </div>
                )
                :
                <div>There is no summoner</div>
            }


        </div>






    )
}






















// import React, { useState, useEffect } from 'react';
// import { FaSearch } from "react-icons/fa";
// import { API } from '../config';
// import { useSelector } from 'react-redux';

// export const Search = () => {
//     const region = useSelector(state => state.regionStore);
//     const [summonerID, setSummonerID] = useState('');
//     const [summonerInfo, setSummonerInfo] = useState({
//         name: '',
//         profileIconId: 0,
//         level: 0,
//     });
//     const [summonerDetail, setSummonerDetail] = useState({
//         queueType: '',
//         tier: '',
//         rank: '',
//         leaguePoints: 0,
//         wins: 0,
//         losses: 0,

//     })
//     const { id, name, profileIconId, level } = summonerInfo;
//     const { queueType, tier, rank, leaguePoints, wins, losses } = summonerDetail;

//     // useEffect(() => {
//     //     (
//     //         async () => {
//     //             const response = await fetch(`${API.GET_SUMMONER_DETAIL_BY_ID}/${id}`)
//     //             const data = await response.json();
//     //             console.log(data);
//     //         }
//     //     )();
//     // }, [])

//     const handleChange = (e) => {
//         const newInput = e.target.value;
//         setSummonerID(newInput);
//     }
//     // https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/
//     const handleClick = async () => {
//         if (summonerID.length > 0) {
//             const response = await fetch(`${API.GET_SUMMONER_BY_NAME}/${summonerID}?region=${region}`);
//             const data = await response.json();
//             console.log(data);
//             console.log('1');
//             setSummonerInfo({
//                 id: data.id,
//                 name: data.name,
//                 profileIconId: data.profileIconId,
//                 level: data.summonerLevel,
//             });
//             console.log(summonerInfo.id);
//             const response2 = await fetch(`${API.GET_SUMMONER_DETAIL_BY_ID}/18DGpAfpkizFV_QeZruhnqFhjao8lcwqhzHKxbOcqfFRXA`)
//             console.log('3');
//             const data2 = await response2.json();
//             console.log(data2);
//             setSummonerDetail({
//                 queueType: data2.queueType,
//                 tier: data2.tier,
//                 rank: data2.rank,
//                 leaguePoints: data2.leaguePoints,
//                 wins: data2.wins,
//                 losses: data2.losses,
//             })

//         }
//     }
//     return (
//         <div className="wrap">
//             {console.log(id)}
//             <div className="search">
//                 {/* <input type="text" className="summoner-id" placeholder="Enter the Summoner's ID" onChange={e => setSummonerID(e.target.value)} value={summonerID} /> */}
//                 <input type="text" className="searchTerm" placeholder="Enter the Summoner's ID" onChange={handleChange} />
//                 <button type="submit" className="searchButton" onClick={handleClick}>
//                     <FaSearch />
//                 </button>
//             </div>
//             <div className="summoner-info">
//                 {
//                     name.length > 0 ?
//                         <div>
//                             <img src={`${API.GET_PROFILEICON}/${profileIconId}.png`} alt="profileIcon" />
//                             <h2>{name}</h2>
//                             <h3>{level}</h3>
//                             <h3>{tier}</h3>
//                         </div>
//                         : ''

//                 }
//             </div>
//         </div>
//     )
// }









