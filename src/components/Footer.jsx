import React from 'react';
import { Link } from 'react-router-dom';
import { SiRiotgames } from "react-icons/si";
import { AiFillGithub } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import lolIcon from "../images/lol-icon.png";

export const Footer = () => {
    return (
        <div>


            <div>Created by Sangmean Hong</div>
            <div>sangmean.hong@gmail.com</div>


            <div className="footer-logos">
                <ul>
                    {/* 여기서 target="_blank" 를 이용해서 새창을 열 경우에 반드시  rel="noopener noreferrer" 이 속성을 추가해주어서 보안을 강화해야 한다. rel=noopener 속성이 부여된 링크를 통해 열린 페이지는 location 변경과 같은 자바스크립트 요청을 거부한다. 정확히 말해서 Uncaught TypeError 에러를 발생시킨다. 이것을 사용하지 않았을 경우에는 새창이 열리면서 해커가 피싱사이트로 리 로케이션을 해서 정보를 탈취할수 있으며 정보를 탈취한후에 본래의 사이트로 리다이렉트 할 수가 있다.*/}
                    <a href="https://www.riotgames.com/en" target="_blank" rel="noopener noreferrer"><SiRiotgames /></a>
                    <a href="https://na.leagueoflegends.com/en-us/" target="_blank" rel="noopener noreferrer"><img src={lolIcon} alt="league"></img></a>
                    <a href="https://github.com/jadenHong" target="_blank" rel="noopener noreferrer"><AiFillGithub /></a>
                    <a href="https://www.facebook.com/sangmean.hong" target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>
                </ul>
            </div>
        </div>
    )
}