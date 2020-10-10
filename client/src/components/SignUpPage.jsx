import React from 'react';
import { useState, useEffect, useRef } from "react";
import { USER_BASE, API_BASE, EMAIL_REG_EXP } from '../config';
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import { EmailVerification } from './EmailVerification';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("Canadian");
    const [email, setEmail] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [usernameMsg, setUsernameMsg] = useState({
        msg: "",
        status: 0,
    });
    const [openSignUpPage, setOpenSignUpPage] = useState(false);
    const [verifyNum, setVerifyNum] = useState('');
    const [emailVerifiCation, setEmailVerifiCation] = useState(false);
    const [phoneValue, setPhoneValue] = useState();

    const usernameRef = useRef();
    const emailRef = useRef();
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
        if (name === "confirmation") setConfirmation(value);
        if (name === "email") setEmail(value);
        if (name === "nickname") setNickname(value);
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
            body: JSON.stringify({ username, password, nickname, email, phoneValue }),
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


    const sendEmail = async () => {

        const email_check = EMAIL_REG_EXP;
        if (!email.match(email_check)) {
            emailRef.current.focus();
            return alert('Email format is incorrect');

        } else {
            setOpenSignUpPage(true);
            const response = await fetch(`${API_BASE}/email/verification`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                }),
            })
            const data = await response.json();
            console.log(data);
            setVerifyNum(data);
        }
    }


    return (
        <div className="signup-page">
            {console.log(phoneValue)}
            {usernameMsg.status !== 200 || usernameMsg.status === 0 ? (
                <div className="signup-section">
                    <div className="signup-input">
                        <h2>New User</h2>
                        <div className="user-nick">
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                name="username"
                                ref={usernameRef}
                            />
                            <input
                                type="text"
                                placeholder="NickName"
                                onChange={handleChange}
                                name="nickname"
                            />
                        </div>
                        <div className="pw-confirmpw">
                            <input
                                style={inputErrorStyle}
                                type="text"
                                placeholder="Password"
                                onChange={handleChange}
                                name="password"
                            />
                            <input
                                style={inputErrorStyle}
                                type="text"
                                placeholder="Confirm password"
                                onChange={handleChange}
                                name="confirmation"
                            />
                        </div>
                        <div className="phone-email">
                            <PhoneInput
                                placeholder="Phone number"
                                value={phoneValue}
                                onChange={setPhoneValue} />
                        </div>

                        {usernameMsg.status === 200 ? "" : <div>{usernameMsg.msg}</div>}
                        <div>
                            <input
                                type="text"
                                placeholder="Email"
                                onChange={handleChange}
                                name="email"
                                ref={emailRef}
                            />
                            <button
                                className="email-send-button"
                                type="button"
                                onClick={sendEmail}
                                disabled={!email}
                            >
                                Send</button>

                        </div>
                    </div>

                    <Modal open={openSignUpPage} onClose={() => setOpenSignUpPage(false)} center>
                        <EmailVerification verifyNum={verifyNum} setOpenSignUpPage={setOpenSignUpPage} sendEmail={sendEmail} setEmailVerifiCation={setEmailVerifiCation} />
                    </Modal>


                    <button
                        className="submit-button"
                        type="button"
                        onClick={sendDataToServer}
                        disabled={!emailVerifiCation || submitDisabled() || !passwordMatch}
                    >
                        Submit
                    </button>
                </div>
            ) : (
                    <div className="success-page">
                        <h2>Congratulations!!</h2>
                        <div>You have been registered as a member.</div>
                    </div>
                )}
        </div>
    );
}