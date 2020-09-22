import React from 'react';
import { API } from '../config';
import darkgrey from '../images/darkgrey.png';

export const MatchedGameDetail = ({ matchesInfo, clickedData, allChampsData, allRunesData, allSpellsData }) => {
    console.log(matchesInfo);
    const matchedInformation = JSON.parse(JSON.stringify(matchesInfo)); // 객체 깊은 복사.
    console.log(matchedInformation);
    const { participants, participantIdentities } = matchedInformation;
    // console.log(allSpellsData);
    // console.log(allChampsData)


    const getSummonersInfo = (data, index) => {
        const { assists, champLevel, deaths, doubleKills, goldEarned, item0, item1, item2, item3, item4, item5, item6, kills, totalMinionsKilled, tripleKills, wardPlaced } = data.stats;
        let { perkPrimaryStyle, perkSubStyle } = data.stats;

        // 챔피언 이름 뽑는 것
        allChampsData.map((champInfo) => {

            if (Number(champInfo.key) === data.championId) {
                data.championId = champInfo.id;
            }
            return data.championId;
        });

        // 유저 아이디 뽑는 것
        participantIdentities.map((identities) => {
            if (identities.participantId === data.participantId) {
                data.participantId = identities.player.summonerName;
            }
            return data.participantId;
        });

        // 룬 뽑는 것
        allRunesData.map((rune) => {
            if (rune.id === perkPrimaryStyle) {
                perkPrimaryStyle = rune.icon;
            }
            if (rune.id === perkSubStyle) {
                perkSubStyle = rune.icon;
            }
            return '';
        });

        // 스펠 뽑는 것
        allSpellsData.map((spell) => {
            if (data.spell1Id === Number(spell.key)) {
                data.spell1Id = `${spell.id}.png`;
            }
            if (data.spell2Id === Number(spell.key)) {
                data.spell2Id = `${spell.id}.png`;
            }
            return '';
        })


        return (
            <div className="matched-details" key={index}>
                <div key={index} className={data.stats.win ? 'win' : 'lost'}>
                    {index === 0 && <div className="win-defeat1">{data.stats.win ? 'WIN' : 'DEFEAT'}<span className="team">BLUE</span></div>}
                    {index === 5 && <div className="win-defeat2">{data.stats.win ? 'WIN' : 'DEFEAT'}<span className="team">RED</span></div>}
                    {/* <span>Champ ID: {data.championId}</span> */}
                    <div className="users-info">
                        <div className="first-part">

                            <img src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.championId}.png`} alt="images" />
                            <div className="spells-runes">
                                <div className="spells">
                                    <img src={`${API.GET_SPELLS_IMG}/${data.spell1Id}`} alt="images" />
                                    <img src={`${API.GET_SPELLS_IMG}/${data.spell2Id}`} alt="images" />
                                </div>
                                <div className="runes">
                                    <img src={`${API.GET_RUNES_IMG}/${perkPrimaryStyle}`} alt="images" />
                                    <img src={`${API.GET_RUNES_IMG}/${perkSubStyle}`} alt="images" />
                                </div>
                            </div>
                            <div className="id-level">
                                <span className="id">{data.participantId}</span>
                                <span className="level">{champLevel} LV</span>
                            </div>
                        </div>

                        {/* <span> 승패: {data.stats.win ? 'WIN' : 'DEFEAT'}</span> */}
                        <div className="second-part">
                            <span>{`${((kills + assists) / deaths).toFixed(2)}` === 'Infinity' ? 'Perfect' : `${((kills + assists) / deaths).toFixed(2)}`}</span>
                            <div className="kda">
                                <span className="kills">{kills}</span> / <span className="deaths">{deaths}</span> / <span className="assists">{assists}</span>
                            </div>
                        </div>
                        <div className="third-part">
                            <span className="cs">{totalMinionsKilled} ({(totalMinionsKilled / 60).toFixed(1)}) CS</span>
                            <span className="gold">{goldEarned.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} G</span> {/* 숫자에 콤마(,) 찍는 함수 */}
                        </div>
                        <div className="forth-part">
                            {item0 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item0}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
                            {item1 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item1}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
                            {item2 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item2}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
                            {item3 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item3}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
                            {item4 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item4}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
                            {item5 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item5}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
                            {item6 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item6}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
                        </div>
                        {/* http://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/3065.png */}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                <div>
                    {participants.map((data, index) => {

                        switch (data.teamId) {
                            case 100:

                                return (
                                    getSummonersInfo(data, index)
                                );
                            case 200:
                                return (
                                    getSummonersInfo(data, index)
                                );
                            default:
                                return '';
                        }
                    })}
                </div>
            }
        </div>
    )
}





















// import React from 'react';
// import { API } from '../config';

// export const MatchedGameDetail = ({ matchesInfo, clickedData, allChampsData, allRunesData, allSpellsData }) => {
//     const { participants, participantIdentities } = matchesInfo;
//     console.log(matchesInfo)
//     // allChampsData.map((data) => {
//     //     if(Number(data.key) === participants.championId){

//     //     }
//     // })

//     const getSummonersInfo = (data, index) => {
//         const { assists, champLevel, deaths, doubleKills, goldEarned, item0, item1, item2, item3, item4, item5, item6, kills, perkPrimaryStyle, perkSubStyle, totalMinionsKilled, tripleKills, wardPlaced } = data.stats;

//         // 챔피언 이름 뽑는 것
//         allChampsData.map((champInfo) => {

//             if (Number(champInfo.key) === data.championId) {
//                 data.championId = champInfo.id;
//             }
//             return data.championId;
//         });

//         // 유저 아이디 뽑는 것
//         participantIdentities.map((identities) => {
//             if (identities.participantId === data.participantId) {
//                 data.participantId = identities.player.summonerName;
//             }
//             return data.participantId;
//         });



//         return (
//             <div key={index}>
//                 {/* <span>Champ ID: {data.championId}</span> */}
//                 <img src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.championId}.png`} alt="images" />
//                 <span>{data.participantId}</span>
//                 <span> 승패: {data.stats.win ? 'WIN' : 'DEFEAT'}</span>
//                 <span> SPELL 1: {data.spell1Id}</span>
//                 <span> SPELL 2: {data.spell2Id}</span>
//                 <span> Item0: {item0}</span>
//                 <span> Item1: {item1}</span>
//                 <span> Item2: {item2}</span>
//                 <span> Item3: {item3}</span>
//                 <span> Item4: {item4}</span>
//                 <span> Item5: {item5}</span>
//                 <span> Item6: {item6}</span>
//                 <span>KDA: {`${kills} / ${assists} / ${deaths}`}</span>
//                 <span>Level: {champLevel}</span>
//                 <span>Rune: {`{${perkPrimaryStyle} ,  ${perkSubStyle}}`}</span>
//                 <span>Minion: {totalMinionsKilled}</span>
//                 <span>Wards: {wardPlaced}</span>
//                 <span>Gold: {goldEarned}</span>
//             </div>
//         )
//     }

//     return (
//         <div>
//             matched game detail page
//             {
//                 <div>
//                     {participants.map((data, index) => {

//                         switch (data.teamId) {
//                             case 100:

//                                 return (
//                                     getSummonersInfo(data, index)
//                                 );
//                             case 200:
//                                 return (
//                                     getSummonersInfo(data, index)
//                                 );
//                             default:
//                                 return '';
//                         }
//                     })}
//                 </div>
//             }
//         </div>
//     )
// }










// import React from 'react';
// import { API } from '../config';
// import darkgrey from '../images/darkgrey.png';

// export const MatchedGameDetail = ({ matchesInfo, clickedData, allChampsData, allRunesData, allSpellsData }) => {
//     const { participants, participantIdentities } = matchesInfo;
//     console.log(matchesInfo);
//     console.log(allSpellsData);
//     console.log(allChampsData)
//     // allChampsData.map((data) => {
//     //     if(Number(data.key) === participants.championId){

//     //     }
//     // })

//     const getSummonersInfo = (data, index) => {
//         const { assists, champLevel, deaths, doubleKills, goldEarned, item0, item1, item2, item3, item4, item5, item6, kills, totalMinionsKilled, tripleKills, wardPlaced } = data.stats;
//         let { perkPrimaryStyle, perkSubStyle } = data.stats;

//         // 챔피언 이름 뽑는 것
//         allChampsData.map((champInfo) => {

//             if (Number(champInfo.key) === data.championId) {
//                 data.championId = champInfo.id;
//             }
//             return data.championId;
//         });

//         // 유저 아이디 뽑는 것
//         participantIdentities.map((identities) => {
//             if (identities.participantId === data.participantId) {
//                 data.participantId = identities.player.summonerName;
//             }
//             return data.participantId;
//         });

//         // 룬 뽑는 것
//         allRunesData.map((rune) => {
//             if (rune.id === perkPrimaryStyle) {
//                 perkPrimaryStyle = rune.icon;
//             }
//             if (rune.id === perkSubStyle) {
//                 perkSubStyle = rune.icon;
//             }
//             return '';
//         });

//         // 스펠 뽑는 것
//         allSpellsData.map((spell) => {
//             if (data.spell1Id === Number(spell.key)) {
//                 data.spell1Id = `${spell.id}.png`;
//             }
//             if (data.spell2Id === Number(spell.key)) {
//                 data.spell2Id = `${spell.id}.png`;
//             }
//             return '';
//         })


//         return (
//             <div className="matched-details" key={index}>
//                 <div key={index} className={data.stats.win ? 'win' : 'lost'}>
//                     {index === 0 && <div className="win-defeat1">{data.stats.win ? 'WIN' : 'DEFEAT'}<span className="team">BLUE</span></div>}
//                     {index === 5 && <div className="win-defeat2">{data.stats.win ? 'WIN' : 'DEFEAT'}<span className="team">RED</span></div>}
//                     {/* <span>Champ ID: {data.championId}</span> */}
//                     <div className="users-info">
//                         <div className="first-part">

//                             <img src={`${API.GET_CHAMPION_SQUARE_IMG}/${data.championId}.png`} alt="images" />
//                             <div className="spells-runes">
//                                 <div className="spells">
//                                     <img src={`${API.GET_SPELLS_IMG}/${data.spell1Id}`} alt="images" />
//                                     <img src={`${API.GET_SPELLS_IMG}/${data.spell2Id}`} alt="images" />
//                                 </div>
//                                 <div className="runes">
//                                     <img src={`${API.GET_RUNES_IMG}/${perkPrimaryStyle}`} alt="images" />
//                                     <img src={`${API.GET_RUNES_IMG}/${perkSubStyle}`} alt="images" />
//                                 </div>
//                             </div>
//                             <div className="id-level">
//                                 <span className="id">{data.participantId}</span>
//                                 <span className="level">{champLevel} LV</span>
//                             </div>
//                         </div>

//                         {/* <span> 승패: {data.stats.win ? 'WIN' : 'DEFEAT'}</span> */}
//                         <div className="second-part">
//                             <span>{`${((kills + assists) / deaths).toFixed(2)}` === 'Infinity' ? 'Perfect' : `${((kills + assists) / deaths).toFixed(2)}`}</span>
//                             <div className="kda">
//                                 <span className="kills">{kills}</span> / <span className="deaths">{deaths}</span> / <span className="assists">{assists}</span>
//                             </div>
//                         </div>
//                         <div className="third-part">
//                             <span className="cs">{totalMinionsKilled} ({(totalMinionsKilled / 60).toFixed(1)}) CS</span>
//                             <span className="gold">{goldEarned.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} G</span> {/* 숫자에 콤마(,) 찍는 함수 */}
//                         </div>
//                         <div className="forth-part">
//                             {item0 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item0}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
//                             {item1 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item1}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
//                             {item2 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item2}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
//                             {item3 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item3}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
//                             {item4 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item4}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
//                             {item5 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item5}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
//                             {item6 === 0 ? <img src={darkgrey} alt="emptyImage"></img> : <img src={`${API.GET_ITEMS_IMG}/${item6}.png`} onError={(e) => e.target.style.display = 'none'} alt="images" />}
//                         </div>
//                         {/* http://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/3065.png */}
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div>
//             {
//                 <div>
//                     {participants.map((data, index) => {

//                         switch (data.teamId) {
//                             case 100:

//                                 return (
//                                     getSummonersInfo(data, index)
//                                 );
//                             case 200:
//                                 return (
//                                     getSummonersInfo(data, index)
//                                 );
//                             default:
//                                 return '';
//                         }
//                     })}
//                 </div>
//             }
//         </div>
//     )
// }

