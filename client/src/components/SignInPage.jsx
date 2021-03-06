
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../actions';
import { Modal } from 'react-responsive-modal';
import { SignUpPage } from './SignUpPage';
import { FindPassword } from './FindPassword';
import { FindUsername } from './FindUsername';
import { Avatar } from '@material-ui/core';

export const SignInPage = () => {
    const { loginInfo } = useSelector(state => state.loginStore);
    console.log(loginInfo);
    let avatarImg = '';
    if (localStorage.getItem('avatar') !== null) {
        avatarImg = localStorage.getItem('avatar');
    }
    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    const [loginStatus, setLoginStatus] = useState({
        msg: '',
        state: 0,
        nickname: '',

    });
    const [openSingUpPage, setOpenSignUpPage] = useState(false);
    const [openFindUsernamePage, setOpenFindUsernamePage] = useState(false);
    const [openFindPasswordPage, setOpenFindPasswordPage] = useState(false);
    const { msg, state, nickname } = loginStatus;
    console.log('msg: ' + msg, 'state: ' + state, 'nickname: ' + nickname)
    const usernameRef = useRef();



    useEffect(() => {
        if (nickname === null) {
            console.log('로컬에 정보 없다!!!')
            usernameRef.current.focus();
        }

    }, [])

    const handleClick = async () => {
        dispatch(fetchLogin(userInput));
    }
    useEffect(() => {
        console.log(loginInfo);
        // 그냥 세션과 쿠키에 저장하게 되면 loginInfo 가 {} 빈객체도 저장이 되고 다시한번 저장이 되기때문에 빈객체가 아닐경우에만 저장하도록 구현함.
        if (loginInfo.state === 200) {
            const { token, result, nickname, email } = loginInfo;
            sessionStorage.setItem('user', JSON.stringify({ 'userToken': token, 'nickname': nickname, 'email': email }));
            localStorage.setItem('user', JSON.stringify({ 'result': result, 'nickname': nickname, 'email': email }, 0))
            setLoginStatus(loginInfo);
        }
    }, [loginInfo])




    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        })
    }

    const logOutBtn = () => {
        localStorage.clear('user');
        sessionStorage.clear('user');
        window.location.reload();
    }

    return (
        <div>
            {console.log(loginStatus.nickname)}
            <div>{console.log(state)}</div>
            { localStorage.getItem('user') === null && state !== 200 ?
                <div className="login-section">
                    <div className="login">
                        <h2>Log In</h2>
                        <input type="text" placeholder="Username" onChange={handleChange} name="username" ref={usernameRef} />
                        <input type="text" placeholder="Password" onChange={handleChange} name="password" onKeyPress={event => event.key === 'Enter' ? handleClick() : null} />
                        <div style={{ color: 'red' }}>{loginInfo.msg}</div>
                        {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
                    </div>
                    <div className="button-section">
                        <div className="login-signin-buttons">
                            <button type="submit" onClick={handleClick} className="signIn-button">Log in</button>
                            <button className="SignUp-button" onClick={() => setOpenSignUpPage(true)}>
                                Sign Up
                    </button>
                            <Modal open={openSingUpPage} onClose={() => setOpenSignUpPage(false)} center>
                                <SignUpPage />
                            </Modal>
                        </div>
                        <div>
                            <div className="find-buttons">
                                <button className="findUsername-button" onClick={() => setOpenFindUsernamePage(true)}>
                                    Forgot Username?
                                </button>
                                <Modal open={openFindUsernamePage} onClose={() => setOpenFindUsernamePage(false)} center>
                                    < FindUsername />
                                </Modal>
                                <button className="findPassword-button" onClick={() => setOpenFindPasswordPage(true)}>
                                    Forgot Password?
                                </button>
                            </div>
                            <Modal open={openFindPasswordPage} onClose={() => setOpenFindPasswordPage(false)} center>
                                {/* changePssword 컴포넌트에게 전달해주기 위해서 작성함 이렇게 해야지 모달창을 끌수가 있다. */}
                                <FindPassword setOpenFindPasswordPage={setOpenFindPasswordPage} />
                            </Modal>
                        </div>
                    </div>
                </div>
                :
                <div className="success-page">
                    {console.log(avatarImg)}
                    {
                        avatarImg !== '' ?
                            <Avatar
                                src={`/images/${avatarImg}`}
                                alt="avatar"
                            />
                            :
                            <Avatar
                                src={`data:image/png;base64,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`}
                            />
                    }
                    <div>Wellcome {JSON.parse(localStorage.getItem('user')).nickname}</div>
                    <button onClick={logOutBtn}>Log out</button>
                    <button onClick={
                        () => window.location.reload()}>Confirm</button>
                </div>
            }
        </div>
    )
}

