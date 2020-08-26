import React from 'react';
import { Link } from 'react-router-dom';
import { GiOverkill } from "react-icons/gi";
import mainlogo from '../images/league-logo.jpg'
import { FaUserAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { changeRegion } from '../actions/region-action';
export const Menu = () => {


    const dispatch = useDispatch();
    const handleChange = (e) => {
        const selectedRegion = e.target.value;
        console.log(e.target.value);
        dispatch(changeRegion(selectedRegion));
    }

    return (
        <div>

            <div className="nav-menu">
                <div className="logo-title">
                    <GiOverkill />
                    <Link to="/" className="title"><h3>League of Legends</h3></Link>
                </div>
                <div className="navbar">
                    <ul>
                        <Link to="/"><li>Search</li></Link>
                        <Link to="/champions"><li>Champions</li></Link>
                        <Link to="/ranks"><li>Ranks</li></Link>
                    </ul>
                </div>
            </div>

            <select className="select-region" onChange={handleChange}>
                <option value="" name="">Select Region</option>
                <option value="na1" name="na1">North America</option>
                <option value="kr">South Korea</option>
            </select>

            <FaUserAlt className="user-info" />
            <div className="logo-img">
                <img src={mainlogo} alt="main-logo-img" />
            </div>

        </div>
    )
}