import React from 'react';
import { Link } from 'react-router-dom';
// import { GiOverkill } from "react-icons/gi";
import penguinLogo from '../images/penguin.png'
import mainlogo from '../images/lol-logo.png'
import { FaUserAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { changeRegion } from '../actions';
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
                    <img src={penguinLogo} alt="penguin" />
                    <Link to="/" className="title link"><h3>popo.gg</h3></Link>
                </div>
                <div className="navbar">
                    <ul>
                        <Link className="link" to="/search"><li>Search</li></Link>
                        <Link className="link" to="/champions"><li>Champions</li></Link>
                        <Link className="link" to="/ranks"><li>Ranks</li></Link>
                    </ul>
                </div>
            </div>

            <select className="select-region" onChange={handleChange}>
                <option value="" name="">Select Region</option>
                <option value="na1" name="na1">North America</option>
                <option value="kr">Korea</option>
                <option value="jp1">Japan</option>
                <option value="euw1">Europe West</option>
                <option value="eun1">Europe Nordic East</option>
                <option value="oc1">Oceania</option>
                <option value="br1">Brazil</option>
                <option value="ru">Russia</option>
                <option value="tr1">Turkey</option>
                <option value="la1">Latin North</option>
                <option value="la2">Latin South</option>
            </select>

            <FaUserAlt className="user-info" />
            <div className="logo-img">
                <img src={mainlogo} alt="main-logo-img" />
            </div>

        </div>
    )
}