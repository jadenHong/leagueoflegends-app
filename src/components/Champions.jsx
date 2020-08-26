import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE, API } from '../config/index';

export const Champions = () => {
    const [champs, setChamps] = useState();

    useEffect(() => {
        getData();
        console.log(champs)
    }, []);

    const getData = async () => {
        const response = await fetch(`http://localhost:7779/champs`);
        const data = await response.json();
        console.log(data);
        setChamps(Object.values(data))
        console.log(champs);
    }

    return (
        // http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/
        <div>
            {champs && champs.map((data, index) => {
                return (

                    <Link key={index} to={{
                        pathname: `/champion/detail/${data.name}`,
                        state: {
                            img: data.image.full,
                            name: data.name,
                            tags: data.tags,
                            title: data.title,
                            desc: data.blurb,
                            stats: data.stats,
                        }
                    }}>
                        {/* http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_3.jpg 스킨 넣을때 */}
                        <h2>{data.name}</h2>
                        <img src={`${API.GET_CHAMPIONS}${data.image.full}`} alt="images" />
                    </Link>

                )
            })}
        </div>
    )
}