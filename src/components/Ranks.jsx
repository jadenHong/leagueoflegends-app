import React, { useState, useEffect } from 'react';
import { API, TIER, DIVISIONS, API_BASE } from '../config/index';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

export const Ranks = () => {
    const region = useSelector(state => state.regionStore);
    const [users, setUsers] = useState([]);
    const [URLs, setURLs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [btnClicked, setBtnClicked] = useState(false);
    const [pageState, setPageState] = useState({
        offset: 0,
        tableData: [],
        orgtableData: [],
        perPage: 10,
        currentPage: 0,
    })

    useEffect(() => {
        getURLs();
    }, [])

    useEffect(() => {
        region &&
            getData();

    }, [region]);

    const getURLs = () => {
        const URLs = [];
        const highTiers = [TIER.CHALLENGER, TIER.GRANDMASTER, TIER.MASTER];
        for (const tier of Object.values(TIER)) {
            for (const [i, division] of DIVISIONS.entries()) {
                if (highTiers.includes(tier) && i > 0) continue;
                const url = `${API_BASE}/${tier}/data?division=${division}&region=${region}`;
                URLs.push(url);
            }
        }
        setURLs(URLs);
    }
    // challenger : 2페이지, grandmaster: 4페이지, master: 9페이지 까지 있음
    const getData = async () => {
        const loadData = [];
        for (let i = 0; i < 3; i++) {
            if (i === 0) {
                for (let j = 1; j < 3; j++) {
                    const response = await fetch(`${URLs[i]}${region}&tierPage=${j}`);
                    const data = await response.json();
                    loadData.push(...data);
                    // console.log(data);
                    // setUsers([...users, ...data]);

                }

            } else if (i === 1) {
                for (let j = 1; j < 5; j++) {
                    const response = await fetch(`${URLs[i]}${region}&tierPage=${j}`);
                    const data = await response.json();
                    loadData.push(...data);
                    // console.log(data);
                    // setUsers([...users, ...data]);
                }
            } else if (i === 2) {
                for (let j = 1; j < 10; j++) {
                    const response = await fetch(`${URLs[i]}${region}&tierPage=${j}`);
                    const data = await response.json();
                    loadData.push(...data);
                    // console.log(data);
                    // setUsers([...users, ...data]);
                }
            }

            // console.log(loadData);
        }
        console.log('data-->' + JSON.stringify(loadData))
        var slice = loadData.slice(pageState.offset, pageState.offset + pageState.perPage)
        console.log(loadData);

        setPageState({
            pageCount: Math.ceil(loadData.length / pageState.perPage),
            orgtableData: loadData,
            tableData: slice,
        })

        setUsers(loadData);

    }
    // useEffect(() => {
    //     loadMoreData();
    // }, [btnClicked])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * pageState.perPage;

        setPageState({
            currentPage: selectedPage,
            offset: offset
        });
        setBtnClicked(true);
    }

    // const loadMoreData = () => {
    //     const data = pageState.orgtableData;
    //     const slice = data.slice(pageState.offset, pageState.offset + pageState.perPage);
    //     setPageState({
    //         pageCount: Math.ceil(data.length / pageState.perPage),
    //         tableData: slice,
    //     })
    // }

    return (
        <>
            {console.log(users)}

            <div>
                <table border='1'>
                    <thead>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Tier</th>
                        <th>wins</th>
                        <th>losses</th>
                    </thead>

                    <tbody>
                        {

                            pageState.tableData.map((user, index) =>
                                <tr key={index} style={{ padding: '1rem', border: '1px black solid' }}>
                                    <td>{user.summonerName}</td>
                                    <td>{user.leaguePoints}</td>
                                    <td>{user.tier}</td>
                                    <td>{user.wins}</td>
                                    <td>{user.losses}</td>
                                </tr>)

                        }
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageState.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={() => handlePageClick()}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>

        </>
    )
}





















// import React, { useState, useEffect } from 'react';
// import { API, TIER, DIVISIONS } from '../config/index';
// import { useSelector } from 'react-redux';

// export const Ranks = () => {
//     const ROWS_PER_PAGE = 50;
//     const MAX_RETURN_NUM = 205;
//     const region = useSelector(state => state.regionStore);
//     const [users, setUsers] = useState([]);
//     const [challenger2, setChallenger2] = useState();
//     const [currentPage, setCurrentPage] = useState(1); // url 뒤에 page=1 이거
//     const [currentURLIndex, setCurrentURLIndex] = useState(0); //URLs 배열에 index
//     const [URLs, setURLs] = useState([]);
//     const [offset, setOffset] = useState(0);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         getURLs();
//     }, []);

//     useEffect(() => {
//         if (URLs.length > 0) {
//             console.log(currentURLIndex, currentPage);
//             getData();
//         }
//     }, [URLs.length]);

//     useEffect(() => {
//         return () => {
//             if (currentPage === 1) {
//                 setCurrentURLIndex(i => i + 1);
//             }
//         }
//     }, [currentPage])

//     useEffect(() => {
//         getData();
//     }, [currentURLIndex])

//     const getURLs = () => {
//         const URLs = [];
//         const highTiers = [TIER.CHALLENGER, TIER.GRANDMASTER, TIER.MASTER];
//         for (const tier of Object.values(TIER)) {
//             for (const [i, division] of DIVISIONS.entries()) {
//                 if (highTiers.includes(tier) && i > 0) continue;
//                 const url = `${API.GET_RANKS}/${tier}/${division}?region=${region}`;
//                 URLs.push(url);
//             }
//         }
//         setURLs(URLs);
//     }

//     const getData = async () => {
//         setLoading(true);
//         const URL = URLs[currentURLIndex];
//         console.log(`${URL}&page=${currentPage}`)
//         const response = await fetch(`${URL}&page=${currentPage}`);
//         const data = await response.json();
//         if (data.length < MAX_RETURN_NUM) {
//             setCurrentPage(1);
//         }
//         setUsers([...users, ...data]);
//         setLoading(false);
//     }


// const getChallengers = async () => {
//     // const promises = [await fetch(`${API.GET_RANKS}/${TIER.CHALLENGER}/I?region=${region}`), await fetch(`${API.GET_RANKS}/${TIER.CHALLENGER}/I?page=2&region=${region}`)]

//     // for await (const res of promises) {
//     //     res.json().then(data => {
//     //         setUsers([...users, ...data])
//     //         console.log(users, data)
//     //     })
//     // }

//     for (let i = 1; i < 3; i++) {
//         const response = await fetch(`${API.GET_RANKS}/${TIER.CHALLENGER}/I?page=${i}&region=${region}`);
//         const data = await response.json();
//         localData.push(...data);
//     }



//     setUsers(localData);
// }

// const handleNextPage = () => {
//     console.log('button clicked')
//     setOffset(o => o + ROWS_PER_PAGE);
// }

// useEffect(() => {
//     if (users.length > 0) {
//         const nextBatch = users.slice(offset, offset + ROWS_PER_PAGE);
//         if (nextBatch.length < ROWS_PER_PAGE) {
//             setCurrentPage(p => p + 1)
//         }
//     }
// }, [offset])


// return (
//     <>
//         check region : {region}
//         <div>Current page: {currentPage}</div>
//         <div>Current URL index: {currentURLIndex}</div>
//         <div>Current URL: {URLs[currentURLIndex]}</div>
//         <button onClick={() => handleNextPage()}>Next Page</button>
//         {users.length > 0 &&
//             <div>
//                 {users.slice(offset, offset + ROWS_PER_PAGE).map(user => <div style={{ padding: '1rem', border: '1px black solid' }}>
//                     <div>Name: {user.summonerName}</div>
//                     <div>Points: {user.leaguePoints}</div>
//                     <div>Tier: {user.tier}</div>
//                 </div>)}
//             </div>
//         }

//     </>
// )
// }






// // useEffect(() => {
// //     getChallengers();
// //     (
// //         async () => {
// //             const response = await fetch(`${API.GET_RANKS}/CHALLENGER/I?page=1&region=${region}`);
// //             const data = await response.json();
// //             console.log(data);
// //         }
// //     )();
// // }, [region]);





































// import React, { useState, useEffect } from 'react';
// import { API, TIER, DIVISIONS } from '../config/index';
// import { useSelector } from 'react-redux';

// export const Ranks = () => {
//     const ROWS_PER_PAGE = 50;
//     const MAX_RETURN_NUM = 205;
//     const region = useSelector(state => state.regionStore);
//     const [users, setUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1); // url 뒤에 page=1 이거
//     const [currentURLIndex, setCurrentURLIndex] = useState(0); //URLs 배열에 index
//     const [URLs, setURLs] = useState([]);
//     const [offset, setOffset] = useState(0);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         fetch('http://localhost:7779/getChallenger').then((response) => response.text()).then((data) => console.log(data))
//     }, [])

//     useEffect(() => {
//         getURLs();
//     }, []);

//     useEffect(() => {
//         if (URLs.length > 0) {
//             console.log(currentURLIndex, currentPage);
//             getData();
//         }
//     }, [URLs.length, currentURLIndex, currentPage]);

//     const getURLs = () => {
//         const URLs = [];
//         const highTiers = [TIER.CHALLENGER, TIER.GRANDMASTER, TIER.MASTER];
//         for (const tier of Object.values(TIER)) {
//             for (const [i, division] of DIVISIONS.entries()) {
//                 if (highTiers.includes(tier) && i > 0) continue;
//                 const url = `${API.GET_RANKS}/${tier}/${division}?region=${region}`;
//                 URLs.push(url);
//             }
//         }
//         setURLs(URLs);
//     }

//     const getData = async () => {
//         setLoading(true);
//         const URL = URLs[currentURLIndex];
//         console.log(`${URL}&page=${currentPage}`)
//         const response = await fetch(`${URL}&page=${currentPage}`);
//         const data = await response.json();
//         if (data.length < MAX_RETURN_NUM) {
//             setCurrentPage(1);
//             setCurrentURLIndex(i => i + 1);
//         }
//         setUsers([...users, ...data]);
//         setLoading(false);
//     }

//     const handleNextPage = () => {
//         console.log('button clicked')
//         setOffset(o => o + ROWS_PER_PAGE);
//     }

//     useEffect(() => {
//         if (users.length > 0) {
//             const nextBatch = users.slice(offset, offset + ROWS_PER_PAGE);
//             if (nextBatch.length < ROWS_PER_PAGE) {
//                 setCurrentPage(p => p + 1)
//             }
//         }
//     }, [offset])


//     return (
//         <>
//             check region : {region}
//             <div>Current page: {currentPage}</div>
//             <div>Current URL index: {currentURLIndex}</div>
//             <div>Current URL: {URLs[currentURLIndex]}</div>
//             <button onClick={() => handleNextPage()}>Next Page</button>
//             {users.length > 0 &&
//                 <div>
//                     {users.slice(offset, offset + ROWS_PER_PAGE).map((user, index) => <div key={index} style={{ padding: '1rem', border: '1px black solid' }}>
//                         <div>Name: {user.summonerName}</div>
//                         <div>Points: {user.leaguePoints}</div>
//                         <div>Tier: {user.tier}</div>
//                     </div>)}
//                 </div>
//             }

//         </>
//     )
// }



























// import React, { useState, useEffect } from 'react';
// import { API, TIER, DIVISIONS, API_BASE } from '../config/index';
// import { useSelector } from 'react-redux';
// import ReactPaginate from 'react-paginate';

// export const Ranks = () => {
//     const region = useSelector(state => state.regionStore);
//     const [users, setUsers] = useState([]);
//     const [URLs, setURLs] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     // const [currentPage, setCurrentPage] = useState(1);
//     const [postsPerPage] = useState(10);
//     const [pageState, setPageState] = useState({
//         offset: 0,
//         tableData: [],
//         orgtableData: [],
//         perPage: 10,
//         currentPage: 0,
//     })

//     useEffect(() => {
//         getURLs();
//     }, [])

//     useEffect(() => {
//         region &&
//             getData();

//     }, [region]);

//     const getURLs = () => {
//         const URLs = [];
//         const highTiers = [TIER.CHALLENGER, TIER.GRANDMASTER, TIER.MASTER];
//         for (const tier of Object.values(TIER)) {
//             for (const [i, division] of DIVISIONS.entries()) {
//                 if (highTiers.includes(tier) && i > 0) continue;
//                 const url = `${API_BASE}/${tier}/data?division=${division}&region=${region}`;
//                 URLs.push(url);
//             }
//         }
//         setURLs(URLs);
//     }
//     // challenger : 2페이지, grandmaster: 4페이지, master: 9페이지 까지 있음
//     const getData = async () => {
//         const loadData = [];
//         for (let i = 0; i < 3; i++) {
//             if (i === 0) {
//                 for (let j = 1; j < 3; j++) {
//                     const response = await fetch(`${URLs[i]}${region}&tierPage=${j}`);
//                     const data = await response.json();
//                     loadData.push(...data);
//                     // console.log(data);
//                     // setUsers([...users, ...data]);

//                 }

//             } else if (i === 1) {
//                 for (let j = 1; j < 5; j++) {
//                     const response = await fetch(`${URLs[i]}${region}&tierPage=${j}`);
//                     const data = await response.json();
//                     loadData.push(...data);
//                     // console.log(data);
//                     // setUsers([...users, ...data]);
//                 }
//             } else if (i === 2) {
//                 for (let j = 1; j < 10; j++) {
//                     const response = await fetch(`${URLs[i]}${region}&tierPage=${j}`);
//                     const data = await response.json();
//                     loadData.push(...data);
//                     // console.log(data);
//                     // setUsers([...users, ...data]);
//                 }
//             }

//             // console.log(loadData);
//         }
//         console.log(loadData);
//         setPageState({
//             pageCount: Math.ceil(loadData.length / pageState.perPage),
//             orgtableData: loadData,
//             tableData: loadData,
//         })
//         setUsers(loadData);

//         /*  // server test
//                 const response = await fetch('http://localhost:7779/MASTER/test');
//                 const data = await response.text();
//                 console.log(data) */


//     }

//     const handlePageClick = () => {

//     }

//     return (
//         <>
//             {console.log(users)}

//             <div>
//                 <table border='1'>
//                     <thead>
//                         <th>Name</th>
//                         <th>Points</th>
//                         <th>Tier</th>
//                         <th>wins</th>
//                         <th>losses</th>
//                     </thead>

//                     <tbody>
//                         {

//                             users.slice(0, 50).map((user, index) =>
//                                 <tr key={index} style={{ padding: '1rem', border: '1px black solid' }}>
//                                     <td>{user.summonerName}</td>
//                                     <td>{user.leaguePoints}</td>
//                                     <td>{user.tier}</td>
//                                     <td>{user.wins}</td>
//                                     <td>{user.losses}</td>
//                                 </tr>)

//                         }
//                     </tbody>
//                 </table>
//                 <ReactPaginate
//                     previousLabel={'previous'}
//                     nextLabel={'next'}
//                     breakLabel={'...'}
//                     breakClassName={'break-me'}
//                     pageCount={pageState.pageCount}
//                     marginPagesDisplayed={2}
//                     pageRangeDisplayed={5}
//                     onPageChange={handlePageClick()}
//                     containerClassName={'pagination'}
//                     subContainerClassName={'pages pagination'}
//                     activeClassName={'active'}
//                 />
//             </div>

//         </>
//     )
// }