
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../actions';

export const SignInPage = () => {
    const { loginInfo } = useSelector(state => state.loginStore);
    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState();
    const [loginStatus, setLoginStatus] = useState({
        msg: '',
        state: 0,
        nickname: '',

    });
    // const [tokenToSession, setTokenToSession] = useState();
    const { msg, state, nickname } = loginStatus;
    const usernameRef = useRef();

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    const handleClick = () => {
        dispatch(fetchLogin(userInput));
    }

    useEffect(() => {
        setLoginStatus(loginInfo);
        sessionStorage.setItem('userToken', loginInfo.token);
    }, [loginInfo])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        })
    }

    return (
        <div>
            {state !== 200 ?
                <div className="login-section">
                    <div className="login">
                        <h2>Log In</h2>
                        <input type="text" placeholder="Username" onChange={handleChange} name="username" ref={usernameRef} />
                        <input type="text" placeholder="Password" onChange={handleChange} name="password" />
                        <div>{msg}</div>
                    </div>
                    <div className="button-section">
                        <button type="submit" onClick={handleClick} className="signIn-button">Log in</button>
                    </div>
                </div>
                :
                <div className="success-page">
                    <h2>{loginStatus.msg}</h2>
                </div>
            }
        </div>
    )
}