import React, { useState, useEffect } from 'react';
import { USER_BASE } from '../config';
export const Chat = () => {

    const [authorize, setAuthorize] = useState({
        decoded: {},
        verify: false,
        msg: '',
        state: 0,
    });
    const { msg, state } = authorize;
    const token = sessionStorage.getItem('userToken');
    console.log(token);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {

        const response = await fetch(`${USER_BASE}/verify`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            // credentials: 'include',
            body: JSON.stringify({ token: token }),
        });
        const data = await response.json();
        console.log(data);
        setAuthorize(data);
    }
    return (
        <div>
            {
                console.log(state)
            }
            this is chat page
        </div>
    )
}