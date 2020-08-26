import React from 'react';
import { Link } from 'react-router-dom';
import { GiOverkill } from "react-icons/gi";
import mainlogo from '../images/league-logo.jpg'
import { FaUserAlt } from "react-icons/fa";

export const Menu = () => {
    return (
        <div>
            <div className="nav-menu">
                <div className="logo-title">
                    <GiOverkill />
                    <h3>Leage of Legends</h3>
                </div>
                <div className="navbar">
                    <ul>
                        <Link to="/"><li>Search</li></Link>
                        <Link to="/champions"><li>Champions</li></Link>
                        <Link to="/ranks"><li>Ranks</li></Link>
                    </ul>
                </div>
            </div>
            <FaUserAlt />
            <div className="logo-img">
                <img src={mainlogo} alt="main-logo-img" />
            </div>

        </div>
    )
}