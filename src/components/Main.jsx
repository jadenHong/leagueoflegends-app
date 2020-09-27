import React, { useState, useEffect } from 'react';
// import { API } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChamps } from '../actions';
// import ReactPlayer from 'react-player'; // https://www.npmjs.com/package/react-player

// https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/en-us/production/en-us/static/hero-0632cbf2872c5cc0dffa93d2ae8a29e8.webm 롤 video

export const Main = () => {

    // const region = useSelector(state => state.regionStore);
    const { isLoading, champs } = useSelector(state => state.champStore);
    const [champsData, setChampsData] = useState();
    const dispatch = useDispatch();




    useEffect(() => {
        dispatch(fetchChamps());
        console.log('dispatch 끝')
    }, [dispatch])

    useEffect(() => {
        setChampsData(Object.values(champs));
    }, [champs])

    return (
        <div className="main-page">
            <div className="main-video">
                <video autoPlay className="video-player1" loop>
                    <source src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/en-us/production/en-us/static/hero-0632cbf2872c5cc0dffa93d2ae8a29e8.webm" type="video/webm"></source>
                </video>
                <video autoPlay className="video-player2" loop>
                    <source src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/en-us/production/en-us/static/hero-0632cbf2872c5cc0dffa93d2ae8a29e8.webm" type="video/webm"></source>
                </video>
            </div>
            {
                !isLoading &&
                console.log(champsData)}
        </div>
    )
}