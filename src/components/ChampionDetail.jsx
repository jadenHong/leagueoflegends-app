import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { API } from '../config/index';

export const ChampionDetail = () => {
    const [skin, setSkin] = useState();
    const history = useHistory();
    const location = useLocation();
    // setSkin(location.state);
    console.log(location.state);
    const { img, name, tags, title, desc } = location.state;

    const style = {
        width: '100px',
        height: '100px',
    }

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
        <div>
            <h2>{name}</h2>
            <div>
                {
                    numbers.map((number) => <img src={`${API.GET_SKINS}${name}_${number}.jpg`} alt="skin" style={style} onError="this.onerror" />)
                }

            </div>

        </div>
    )
}