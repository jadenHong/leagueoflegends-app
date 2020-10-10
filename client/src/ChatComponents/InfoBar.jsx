import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";


export const InfoBar = ({ room, users }) => {
    const [open, setOpen] = useState(false);
    console.log(users);
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src='/images/icons/onlineIcon.png' alt="online" /> {/*public 폴더가 src 외부에 존재하기때문에 import 를 할 수가 없다. 하지만 이렇게 경로를 public폴더를 제외하고 주면 가능하다.*/}
                <h3>{room}</h3>
                <button className="modal-button info-modal-button" onClick={() => setOpen(true)}>
                    <img src="/images/icons/chat1.png" alt="iconimg" />
                </button>
                <Modal open={open} onClose={() => setOpen(false)} center>
                    <h3>Currently chatting</h3>
                    <h2>
                        {
                            users
                            && (
                                users.map(({ name, icon }) => (
                                    <div key={name} className="activeItem info-activeItem">
                                        {console.log(icon)}
                                        <img alt="Online Icon" src='/images/icons/onlineIcon.png' className="online-icon" />
                                        <span className="info-user-name">{name}</span>
                                        <img className="info-user-icon" src={`/images/${icon}`} alt="userIfon" />
                                    </div>
                                ))
                            )}
                    </h2>

                </Modal>
            </div>
            <div className="rightInnerContainer">
                <a href="/join"><img src='/images/icons/closeIcon.png' alt="close" /></a>
            </div>
        </div>
    )
}

