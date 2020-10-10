import React, { useState, useRef } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { USER_BASE, EMAIL_REG_EXP } from '../config';

export const FindUsername = () => {
    const [phoneValue, setPhoneValue] = useState();
    const [email, setEmail] = useState("");
    const [resultFromDB, setResultFromDB] = useState({
        result: {},
        state: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
    }
    const emailRef = useRef();

    const submitForm = async () => {
        const email_check = EMAIL_REG_EXP;

        if (!email.match(email_check)) {
            emailRef.current.focus();
            return alert('Email format is incorrect')
        }
        const URL = `${USER_BASE}/findUsername`;
        console.log(email, phoneValue);
        const response = await fetch(URL, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ email, phoneValue }),
        });
        const data = await response.json();
        console.log(data);
        setResultFromDB(data);
    }



    return (
        <div className="findUsername-page">
            {
                resultFromDB.state !== 200 ?
                    <div className="phone-email">
                        <h2>Provide information below</h2>
                        <PhoneInput
                            placeholder="Number"
                            value={phoneValue}
                            onChange={setPhoneValue} />
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={handleChange}
                            name="email"
                            ref={emailRef}
                        />
                        <div>{resultFromDB.state === 411 && resultFromDB.result}</div>
                        <button className="info-submit-button" type="submit" onClick={submitForm}>Submit</button>
                    </div>
                    :
                    <div>
                        <div>
                            Username: {resultFromDB.result.username}
                        </div>
                        <div>Joined: {resultFromDB.result.date.substr(0, 10)}</div>
                    </div>
            }

        </div>
    )
}