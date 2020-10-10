import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchChamps } from '../actions';
import { API } from '../config';
import { Loading } from './Loading';

export const UserMasteries = () => {
    const USER_ID = 'user account id';
    const location = useLocation();
    const dispatch = useDispatch();
    const region = useSelector(state => state.regionStore);
    const { champs } = useSelector(state => state.champStore)
    console.log(location);
    // const id = location.state.id;
    const idFormLocal = localStorage.getItem(USER_ID);
    const [masteryData, setMasteryData] = useState();
    const [allChampsData, setAllChampsData] = useState();
    const [champId, setChampId] = useState();
    const [masteryChamps, setMasteryChamps] = useState();
    const masteryArr = [];
    const [masteryLastInfo, setMasteryLastInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [start, setStart] = useState(0);

    useEffect(() => {
        (
            async () => {
                // server 측에 path 가 '/' 이곳으로 들어와서 프록시 서버를 통해서 정보를 호출한다.

                const response = await fetch(`${API.GET_MASTERY}/${idFormLocal}?region=${region}`);
                // console.log(`${API.GET_MASTERY}/${id}?region=${region}`);
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
            console.log('mastery')
            console.log(masteryData)
            console.log(allChampsData)
            setChampId(masteryData.map((data) => data.championId));

        }
    }, [allChampsData, masteryData]);

    useEffect(() => {
        if (champId) {
            let arr = [];
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
            setIsLoading(false)
        }

    }, [masteryChamps])

    const handleStart = () => {
        console.log('load button 클릭됨')
        setStart(start + 5);
    }

    return (
        <>
            {
                isLoading ?
                    <div className="loading" >
                        <Loading />
                    </div>
                    :
                    <div className="mastery-page">
                        {
                            masteryLastInfo &&
                            masteryLastInfo.map((data, index) => {
                                return (
                                    <div key={index} className="mastery-detail">
                                        <div className="img-name">
                                            <img src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.championId}.png`} alt="champImage" />
                                            <span>{data.championName}</span>
                                        </div>
                                        <span className="level">{data.championLevel} LV</span>
                                        <span className="points">{data.championPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} P</span>
                                    </div>
                                )
                            }).slice(0, start + 5)
                        }
                        {/* <div className="load-more"> */}
                        {start + 5 >= masteryLastInfo.length ? <div className="load-more-button" style={{ backgroundColor: 'rgb(238, 50, 50)' }}>No more Data</div> : <button className="load-more-button" onClick={() => handleStart()}>Load More</button>}
                        {/* </div> */}
                    </div>
            }
        </>
    )
}




























// import React from 'react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import { fetchChamps } from '../actions';
// import { API } from '../config';
// import { Loading } from './Loading';

// export const UserMasteries = () => {
//     const USER_ID = 'user account id';
//     const location = useLocation();
//     const dispatch = useDispatch();
//     const region = useSelector(state => state.regionStore);
//     const { champs } = useSelector(state => state.champStore)
//     console.log(location);
//     // const id = location.state.id;
//     const idFormLocal = localStorage.getItem(USER_ID);
//     const [masteryData, setMasteryData] = useState();
//     const [allChampsData, setAllChampsData] = useState();
//     const [champId, setChampId] = useState();
//     const [masteryChamps, setMasteryChamps] = useState();
//     const masteryArr = [];
//     const [masteryLastInfo, setMasteryLastInfo] = useState();
//     const [isLoading, setIsLoading] = useState(true);


//     useEffect(() => {
//         (
//             async () => {
//                 // server 측에 path 가 '/' 이곳으로 들어와서 프록시 서버를 통해서 정보를 호출한다.

//                 const response = await fetch(`${API.GET_MASTERY}/${idFormLocal}?region=${region}`);
//                 // console.log(`${API.GET_MASTERY}/${id}?region=${region}`);
//                 const data = await response.json();
//                 console.log(data);
//                 setMasteryData(data);
//                 // const champId = data.map((data) => data.championId);

//             }
//         )();
//     }, []);

//     useEffect(() => {
//         dispatch(fetchChamps());
//     }, [dispatch])

//     useEffect(() => {
//         setAllChampsData(Object.values(champs))

//     }, [champs])

//     useEffect(() => {
//         if (masteryData) {
//             console.log('mastery')
//             console.log(masteryData)
//             console.log(allChampsData)
//             setChampId(masteryData.map((data) => data.championId));

//         }
//     }, [allChampsData, masteryData]);

//     useEffect(() => {
//         if (champId) {
//             let arr = [];
//             champId.map((data) => {
//                 const obj = {};
//                 for (let value of allChampsData) {

//                     if (data === Number(value.key)) {
//                         arr.push({
//                             id: value.id,
//                             name: value.name,
//                         });
//                     }
//                 }

//                 return setMasteryChamps(arr);
//             })
//         }
//     }, [champId])

//     useEffect(() => {
//         console.log(masteryChamps)
//         if (masteryChamps) {
//             for (let i = 0; i < masteryChamps.length; i++) {
//                 masteryArr.push({
//                     championId: masteryChamps[i].id,
//                     championName: masteryChamps[i].name,
//                     championLevel: masteryData[i].championLevel,
//                     championPoints: masteryData[i].championPoints,
//                     lastPlayTime: masteryData[i].lastPlayTime,
//                 })
//             }
//             console.log(masteryArr);
//             setMasteryLastInfo(masteryArr);
//             setIsLoading(false)
//         }

//     }, [masteryChamps])

//     return (
//         <>
//             {
//                 isLoading ?
//                     <div className="loading" >
//                         <Loading />
//                     </div>
//                     :
//                     <div className="mastery-page">
//                         {
//                             masteryLastInfo &&
//                             masteryLastInfo.map((data, index) => {
//                                 return (
//                                     <div key={index} className="mastery-detail">
//                                         <div className="img-name">
//                                             <img src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.championId}.png`} alt="champImage" />
//                                             <span>{data.championName}</span>
//                                         </div>
//                                         <span className="level">{data.championLevel} LV</span>
//                                         <span className="points">{data.championPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} P</span>

//                                     </div>
//                                 )
//                             })
//                         }
//                     </div>
//             }
//         </>
//     )
// }