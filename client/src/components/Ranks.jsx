import React, { useState, useEffect } from 'react';
import { TIER, DIVISIONS, API_BASE } from '../config/index';
import { useSelector } from 'react-redux';
import Paginator from 'react-hooks-paginator';
import { Loading } from './Loading';

export const Ranks = () => {
    const region = useSelector(state => state.regionStore);
    const [users, setUsers] = useState([]);
    const [URLs, setURLs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [urlCount, setUrlCount] = useState(0);
    const pageLimit = 20;

    console.log(region);

    useEffect(() => {
        setUsers([]);
        setIsLoading(true);
        setUrlCount(0);
        getURLs();
    }, [region])

    useEffect(() => {
        getData(urlCount);
        // console.log('getData');
    }, [URLs]);



    useEffect(() => {
        // console.log(offset);
        setCurrentData(users.slice(offset, offset + pageLimit));
    }, [offset, users])

    useEffect(() => {
        console.log(currentPage === Math.floor(users.length / pageLimit) - 4)
        if (Math.floor(users.length / pageLimit) - 4 <= currentPage) {
            // console.log(urlCount);
            getData(urlCount);
            // console.log(users)
        }
    }, [Math.floor(users.length / pageLimit) - 4 <= currentPage])

    const getURLs = () => {
        const URLs = [];
        const highTiers = [TIER.CHALLENGER, TIER.GRANDMASTER, TIER.MASTER];
        for (const tier of Object.values(TIER)) {
            console.log('url 가지러 옴')
            for (const [i, division] of DIVISIONS.entries()) {
                if (highTiers.includes(tier) && i > 0) continue;
                const url = `${API_BASE}/${tier}/data?division=${division}&region=${region}`;
                URLs.push(url);
            }
        }
        console.log(URLs)
        setURLs(URLs);
    }


    // challenger : 2페이지, grandmaster: 4페이지, master: 9페이지 까지 있음
    const getData = async (i) => {
        // console.log(i);
        // console.log(URLs)
        const loadData = [];


        if (i === 0) {
            console.log(users)
            for (let j = 1; j < 3; j++) {
                // console.log(`${URLs[i]}&tierPage=${j}`)
                const response = await fetch(`${URLs[i]}&tierPage=${j}`);
                // console.log(response)
                const data = await response.json();
                console.log(data);
                loadData.push(...data);
            }
        }
        console.log(loadData);


        // console.log(newLoadedData);

        if (i === 1) {
            console.log(users)
            for (let j = 1; j < 5; j++) {
                const response = await fetch(`${URLs[i]}&tierPage=${j}`);
                const data = await response.json();
                loadData.push(...data);
            }
        }

        if (i === 2) {
            console.log(`${URLs[i]}&tierPage=${1}`)
            for (let j = 1; j < 10; j++) {
                const response = await fetch(`${URLs[i]}&tierPage=${j}`);
                const data = await response.json();
                loadData.push(...data);
            }
        }


        if (i === 3) {
            console.log('i === 3');
            console.log(`${URLs[i]}&tierPage=${1}`)
            for (let j = 1; j < 10; j++) {
                const response = await fetch(`${URLs[i]}&tierPage=${j}`);
                const data = await response.json();
                loadData.push(...data);
            }

        }



        const newData = users.concat(loadData);

        // 랭킹을 표현하기 위해서 새로운 객체를 만들어서 이곳에 ranking 을 포함해서 저장한다.
        const newLoadedData = newData.map((data, index) => {
            const obj = {
                ranking: index + 1,
                leagueId: data.leagueId,
                leaguePoints: data.leaguePoints,
                summonerName: data.summonerName,
                tier: data.tier,
                wins: data.wins,
                losses: data.losses,
                summonerId: data.summonerId,
            };
            return obj;
        }
        )

        console.log(newLoadedData)
        setUrlCount(urlCount + 1);
        setUsers(newLoadedData);
        // console.log(loadData);
        setIsLoading(false)

    }

    // currentPage === users.length/30 -1
    return (
        <>
            {console.log('isLoading ? ' + isLoading)}
            {
                isLoading ?
                    <div className="loading" >
                        <Loading />
                    </div>
                    :
                    <div className="rank-page">
                        <table border='1' className="rank-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Tier</th>
                                    <th>Points</th>
                                    <th>wins</th>
                                    <th>losses</th>
                                    <th>Rates</th>
                                </tr>
                            </thead>

                            <tbody>
                                {

                                    currentData.map((user, index) =>
                                        <tr key={index}>
                                            <td>{user.ranking}</td>
                                            <td>{user.summonerName}</td>
                                            <td className="tier">
                                                <span><img className="emblem-img" src={require(`../images/ranked-emblems/${user.tier}.png`)} alt="tier-emblem" />{(user.tier).charAt(0) + (user.tier).slice(1, user.tier.length).toLowerCase()}</span>
                                            </td>
                                            <td>{user.leaguePoints}</td>
                                            <td className="wins">{user.wins}</td>
                                            <td className="losses">{user.losses}</td>
                                            <td className="rates">{`${Math.round(user.wins / (user.wins + user.losses) * 100)}%`}</td>
                                        </tr>)

                                }
                            </tbody>
                        </table>
                        <Paginator
                            totalRecords={10000}
                            pageLimit={pageLimit}
                            pageNeighbours={2}
                            setOffset={setOffset}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />

                    </div>
            }
        </>

    )
}












// import React, { useState, useEffect } from 'react';
// import { API, TIER, DIVISIONS, API_BASE } from '../config/index';
// import { useSelector } from 'react-redux';
// import Paginator from 'react-hooks-paginator';
// import { Loading } from './Loading';

// export const Ranks = () => {
//     const region = useSelector(state => state.regionStore);
//     const [users, setUsers] = useState([]);
//     const [URLs, setURLs] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     const [offset, setOffset] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [currentData, setCurrentData] = useState([]);
//     const [urlCount, setUrlCount] = useState(0);
//     const pageLimit = 20;




//     useEffect(() => {
//         getURLs();
//     }, [region])

//     useEffect(() => {
//         getData(urlCount);
//         setIsLoading(false)
//         console.log('getData');
//     }, [URLs]);



//     useEffect(() => {
//         console.log(offset);
//         setCurrentData(users.slice(offset, offset + pageLimit));
//     }, [offset, users])

//     useEffect(() => {
//         console.log(currentPage === Math.floor(users.length / pageLimit) - 4)
//         if (Math.floor(users.length / pageLimit) - 4 <= currentPage) {
//             console.log(urlCount);
//             getData(urlCount);
//             console.log(users)
//         }
//     }, [Math.floor(users.length / pageLimit) - 4 <= currentPage])

//     const getURLs = () => {
//         const URLs = [];
//         const highTiers = [TIER.CHALLENGER, TIER.GRANDMASTER, TIER.MASTER];
//         for (const tier of Object.values(TIER)) {
//             console.log('url 가지러 옴')
//             for (const [i, division] of DIVISIONS.entries()) {
//                 if (highTiers.includes(tier) && i > 0) continue;
//                 const url = `${API_BASE}/${tier}/data?division=${division}&region=${region}`;
//                 URLs.push(url);
//             }
//         }
//         // console.log(URLs)
//         setURLs(URLs);
//     }


//     // challenger : 2페이지, grandmaster: 4페이지, master: 9페이지 까지 있음
//     const getData = async (i) => {
//         // console.log(i);
//         console.log(URLs)
//         const loadData = [];


//         if (i === 0) {
//             console.log(users)
//             for (let j = 1; j < 3; j++) {
//                 // console.log(`${URLs[i]}&tierPage=${j}`)
//                 const response = await fetch(`${URLs[i]}&tierPage=${j}`);
//                 // console.log(response)
//                 const data = await response.json();
//                 loadData.push(...data);
//             }
//         }
//         if (i === 1) {
//             console.log(users)
//             for (let j = 1; j < 5; j++) {
//                 const response = await fetch(`${URLs[i]}&tierPage=${j}`);
//                 const data = await response.json();
//                 loadData.push(...data);
//             }
//         }


//         if (i === 2) {
//             console.log(`${URLs[i]}&tierPage=${1}`)
//             for (let j = 1; j < 10; j++) {
//                 const response = await fetch(`${URLs[i]}&tierPage=${j}`);
//                 const data = await response.json();
//                 loadData.push(...data);
//             }
//         }


//         if (i === 3) {
//             console.log('i === 3');
//             console.log(`${URLs[i]}&tierPage=${1}`)
//             for (let j = 1; j < 10; j++) {
//                 const response = await fetch(`${URLs[i]}&tierPage=${j}`);
//                 const data = await response.json();
//                 loadData.push(...data);
//             }

//         }
//         const newData = users.concat(loadData);
//         console.log(newData)
//         setUrlCount(urlCount + 1);
//         setUsers(newData);
//         // console.log(loadData);
//         setIsLoading(true);
//     }

//     // currentPage === users.length/30 -1
//     return (
//         <>
//             {/* {console.log(users)} */}
//             {
//                 isLoading ?

//                     <div className="rank-page">
//                         <table border='1' className="rank-table">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Tier</th>
//                                     <th>Points</th>
//                                     <th>wins</th>
//                                     <th>losses</th>
//                                     <th>Rates</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {

//                                     currentData.map((user, index) =>
//                                         <tr key={index}>
//                                             <td>{user.summonerName}</td>
//                                             <td className="tier">
//                                                 <span><img className="emblem-img" src={require(`../images/ranked-emblems/${user.tier}.png`)} alt="tier-emblem" />{user.tier}</span>
//                                             </td>
//                                             <td>{user.leaguePoints}</td>
//                                             <td>{user.wins}</td>
//                                             <td>{user.losses}</td>
//                                             <td>{`${Math.round(user.wins / (user.wins + user.losses) * 100)}%`}</td>
//                                         </tr>)

//                                 }
//                             </tbody>
//                         </table>
//                         <Paginator
//                             totalRecords={10000}
//                             pageLimit={pageLimit}
//                             pageNeighbours={2}
//                             setOffset={setOffset}
//                             currentPage={currentPage}
//                             setCurrentPage={setCurrentPage}
//                         />

//                     </div>
//                     :
//                     <Loading />



//             }
//         </>

//     )
// }

