import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API } from '../config/index';

export const ChampionDetail = () => {
    const location = useLocation();
    const [skins, setSkins] = useState([]);
    // setSkin(location.state);
    console.log(location.state);
    const { img, name, tags, title, desc } = location.state;

    // () => {
    // const capitalise = name => `${name.charAt(0).toUpperCase() + name.slice(1)}`;
    // console.log(capitalise);
    //     // const capitalise = name => `${name.charAt(0).toUpperCase() + name.slice(1)}`;
    //     // console.log(capitalise);
    //     fetch(`${API.GET_CHAMPIONS}/${name}.json`).then(res => {
    //         const data = res.json();
    //         console.log(data);
    //         return data;
    //     }).then(data => {
    //         setSkins(data.data[name].skins)
    //     })

    useEffect(() => {
        // userEffect 내부에서 async 를 적용하려면 따로 함수를 정의해줘야 한다. 그리고 그 따로 정의된 함수를 화살표 함수를 이용해서 즉시실행을 해야 하는데 화살표 함수를 사용할 경우 그 함수를 괄호 '()' 로 묶고 맨뒤에 (); 이렇게 사용해줘야 한다.
        (async () => {
            const response = await fetch(`${API.GET_CHAMPIONS}/${name}.json`);
            const data = await response.json();
            setSkins(data.data[name].skins)
        })();
    }, [])
    const style = {
        width: '200px',
        height: '200px',
    }


    return (
        <div>
            <img src={`${API.GET_CHAMPION_SQUARE_IMG}/${img}`} alt="img" />
            <h2>{name}</h2>
            <h3>{title}</h3>
            <h3>{tags.join(',')}</h3>
            <h3>{desc}</h3>
            <h3>Skins</h3>
            <div>
                {skins.map((skin, index) => <img key={index} src={`${API.GET_SKINS}${name}_${skin.num}.jpg`} alt={`${skin.name}`} style={style} />)}
            </div>
        </div>
    )
}