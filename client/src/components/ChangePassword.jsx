import React, { useState, useRef, useEffect } from 'react';
import { USER_BASE } from '../config';

export const ChangePassword = ({ setOpenFindPasswordPage, email, phoneValue }) => {

    const [inputNewPW, setInputNewPW] = useState('');
    const [inputConfirmPW, setConfirmPW] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const passwordRef = useRef();
    useEffect(() => {
        passwordRef.current.focus();
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "newPW") return setInputNewPW(value);
        if (name === "confirmPW") return setConfirmPW(value);
    }

    const handleClick = async () => {
        console.log(inputNewPW);
        console.log(inputConfirmPW);
        const type = 'changePWType';
        if (inputNewPW !== '' && inputNewPW === inputConfirmPW) {
            console.log('비번 똑같이 입력함');
            setErrorMsg('');
            alert('Password is changed successfully !!');
            setOpenFindPasswordPage(false);
            const URL = `${USER_BASE}/findPassword`;
            const response = await fetch(URL, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ inputNewPW, type, email, phoneValue }),
            });
            const data = await response.json();
            console.log(data);
        } else {
            setErrorMsg('Password did not match: Please try again...');
        }
    }

    return (
        <div className="changePW-page">
            <input ref={passwordRef} placeholder="New Password" type="text" onChange={handleChange} name="newPW" />
            <input
                placeholder="Confirm New Password"
                type="text" onChange={handleChange}
                name="confirmPW"
                onKeyPress={event => event.key === 'Enter' ? handleClick() : null}
            />
            {errorMsg !== '' ? <div style={{ color: 'red' }}>{errorMsg}</div> : null}
            <button type="button" onClick={handleClick}>Change</button>
        </div>
    )
}