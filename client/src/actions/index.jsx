// redux 구현하기 위해서 redux, react-redux, redux-logger 설치해줌.
import { USER_BASE } from '../config';
export const CHANGE_REGION = 'CHANGE_REGION';
export const FETCH_CHAMPS = 'FETCH_CHAMPS';
export const FETCH_SPELLS = 'FETCH_SPELLS';
export const FETCH_RUNES = 'FETCH_RUNES';
export const FETCH_LOGIN = 'FETCH_LOGIN';
export const GET_LOCALSTORAGE = 'GET_LOCALSTORAGE';

export const fetchLogin = (userInput) => {
    return {
        type: FETCH_LOGIN,
        payload: new Promise(async (resolve, reject) => {
            try {
                const data = await (await fetch(`${USER_BASE}/login`, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(userInput),
                })).json();
                console.log(data);
                resolve(data);
            } catch (error) {
                reject(error.message);
            }
        })

    }
}

export const changeRegion = (region) => {
    return {
        type: CHANGE_REGION,
        region,
    }
}

export const fetchChamps = () => ({
    type: FETCH_CHAMPS,
    payload: new Promise(async (resolve, reject) => {
        try {
            const data = await (await fetch(`http://localhost:7779/champs`)).json();
            console.log(data);
            resolve(data);
        } catch (error) {
            reject(error.message);
        }
    })
});

export const fetchSpells = () => ({
    type: FETCH_SPELLS,
    payload: new Promise(async (resolve, reject) => {
        try {
            const data = await (await fetch(`http://localhost:7779/spells`)).json();
            console.log(data);
            resolve(data);
        } catch (error) {
            reject(error.message);
        }
    })
});

export const fetchRunes = () => ({
    type: FETCH_RUNES,
    payload: new Promise(async (resolve, reject) => {
        try {
            const data = await (await fetch('http://localhost:7779/runes')).json();
            console.log(data);
            resolve(data);
        } catch (error) {
            reject(error.message);
        }
    })
});

export const getLocalStorage = () => ({
    type: GET_LOCALSTORAGE,
    localData: ''

})