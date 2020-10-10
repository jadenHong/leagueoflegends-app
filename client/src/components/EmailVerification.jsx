import React, { useState } from 'react';


export const EmailVerification = ({ verifyNum, setOpenSignUpPage, sendEmail, setEmailVerifiCation }) => {
    console.log('verifyNum: ' + verifyNum);
    const [code, setCode] = useState('');

    const handleChange = (e) => {
        const input = e.target.value;
        console.log(input);
        setCode(input);
    }
    const handleSubmit = () => {
        if (code === verifyNum) {
            alert('Your code verified successfully');
            setEmailVerifiCation(true);
            setOpenSignUpPage(false);
        } else {
            alert('You failed to verify code, Please try again or re-send code');
        }
    }
    return (
        <div>
            <input
                type="text"
                placeholder="Enter 6 digits code here"
                onChange={handleChange}
                onKeyPress={event => event.key === 'Enter' ? handleSubmit() : null}
            />
            <button
                type="button"
                className="SignUp-button"
                onClick={handleSubmit}
            >
                Check
            </button>
            <button
                type="button"
                className="SignUp-button"
                onClick={sendEmail}
            >
                Re-send
            </button>
        </div>
    )
}