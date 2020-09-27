import React from 'react';
import { useState, useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { USER_BASE } from '../config';

export const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [usernameMsg, setUsernameMsg] = useState({
        msg: "",
        status: 0,
    });
    const usernameRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
        if (name === "confirmation") setConfirmation(value);
    };
    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        if (
            password.length > 0 &&
            confirmation.length > 0 &&
            password === confirmation
        ) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }, [password, confirmation]);

    const sendDataToServer = async () => {
        const URL = `${USER_BASE}/signup`;
        const response = await fetch(URL, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        setUsernameMsg(data);
    };

    const submitDisabled = () => {
        if (!username.length || !password.length || !confirmation.length)
            return true;
        return false;
    };

    const inputErrorStyle = {
        // ...(!passwordMatch && { border: '1px solid red' }) 조건부 객체에 프로퍼티 추가 할때 spread 사용. spread의 특성상 객체를 벗겨서 key, value 를 넣어준다. 를 이용한 코드
        border: !passwordMatch ? "2px solid red" : undefined,
    };
    // usernameMsg.status === 200 ? 'success' : <div>{usernameMsg.msg}</div>
    return (
        <div className="signup-page">
            {usernameMsg.status !== 200 || usernameMsg.status === 0 ? (
                <div className="signup-section">
                    <div className="signup-input">
                        <h2>New User</h2>
                        <label>User Name</label>
                        <input
                            type="text"
                            placeholder="Enter the username"
                            onChange={handleChange}
                            name="username"
                            ref={usernameRef}
                        />
                        <label>Password</label>
                        <input
                            style={inputErrorStyle}
                            type="text"
                            placeholder="Enter the password"
                            onChange={handleChange}
                            name="password"
                        />
                        <label>Confirmation</label>
                        <input
                            style={inputErrorStyle}
                            type="text"
                            placeholder="Enter the same password"
                            onChange={handleChange}
                            name="confirmation"
                        />
                    </div>
                    {usernameMsg.status === 200 ? "" : <div>{usernameMsg.msg}</div>}
                    <button
                        type="button"
                        onClick={sendDataToServer}
                        disabled={submitDisabled() || !passwordMatch}
                    >
                        Submit
                    </button>
                </div>
            ) : (
                    <div className="success-page">
                        <h2>Congratulations!!</h2>
                        <div>You have been registered as a member.</div>
                        <Link to="/login/bulletin" className="link-login">Go to Log In</Link>
                    </div>
                )}
        </div>
    );
}