import React, { useState } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { USER_BASE, EMAIL_REG_EXP } from '../config';
import { ChangePassword } from './ChangePassword';

export const FindPassword = ({ setOpenFindPasswordPage }) => {
    const [phoneValue, setPhoneValue] = useState();
    const [email, setEmail] = useState("");
    const [sentForm, setSentForm] = useState(false);
    const [inputVerifyNum, setInputVerifyNum] = useState();
    const [verifyNum, setVerifyNum] = useState();
    const [compareNum, setCompareNum] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "numberByEmail") setInputVerifyNum(value);
    }

    const submitForm = async () => {
        const email_check = EMAIL_REG_EXP;
        const type = 'emailType';
        if (!email.match(email_check)) {
            return alert('Email format is incorrect')
        }
        const URL = `${USER_BASE}/findPassword`;
        console.log(email, phoneValue);
        const response = await fetch(URL, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ email, phoneValue, type }),
        });
        const data = await response.json();
        console.log(data);
        setVerifyNum(data);
        setSentForm(true);
    }

    const handleSubmit = () => {
        console.log(verifyNum);
        console.log(inputVerifyNum);
        if (verifyNum !== inputVerifyNum) {
            setCompareNum(false);
            alert('The code is incorrect. Please verify code...')
        } else {
            setCompareNum(true);
        }
    }

    return (
        <div className="findPassword-page">
            { !sentForm ?
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
                        onKeyPress={event => event.key === 'Enter' ? submitForm() : null}
                    />
                    {/* <div>{resultFromDB.state === 411 && resultFromDB.result}</div> */}
                    <button className="info-submit-button" type="submit" onClick={submitForm}>Submit</button>
                </div>
                :
                (
                    <div>
                        {
                            !compareNum ?
                                <div>
                                    <div>Enter the number sent by email</div>
                                    <input
                                        onKeyPress={event => event.key === 'Enter' ? handleSubmit() : null}
                                        type="text"
                                        onChange={handleChange}
                                        name="numberByEmail"
                                        placeholder="Six digits"
                                    />
                                    <button className="digits-button" type="submit" onClick={() => handleSubmit()}>Submit</button>
                                </div>
                                :
                                <div>
                                    <ChangePassword setOpenFindPasswordPage={setOpenFindPasswordPage} email={email} phoneValue={phoneValue} />
                                </div>
                        }
                    </div>
                )
            }
        </div>
    )
}