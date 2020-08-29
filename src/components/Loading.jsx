// Loading spinner
import React from 'react';
import ReactLoading from 'react-loading';

export const Loading = ({ Bubbles, color = '#333333' }) => {
    return (
        <>
            <ReactLoading type={Bubbles} color={color} height={50} width={50} />
        </>
    )
};


