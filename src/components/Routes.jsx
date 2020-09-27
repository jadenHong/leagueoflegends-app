import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Menu, Footer } from '.';

import { Main, Search, Champions, ChampionDetail, Ranks, Chat, UserInfo, UserMatchHistory } from '.';
import { MatchedGameDetail } from './MatchedGameDetail';
import { UserInGame } from './UserInGame';
import { UserMasteries } from './UserMasteries';

export default () => {
    return (
        <BrowserRouter>
            <div style={{ height: '100%' }}>
                <Menu />
                <Route exact path="/" component={Main} />
                <Route path="/search" component={Search} />
                <Route path="/champions" component={Champions} />
                <Route path="/champion/detail/:name" component={ChampionDetail} />
                <Route path="/ranks" component={Ranks} />
                <Route path="/chat" component={Chat} />
                <Route path="/search/userInfo" component={UserInfo} />
                <Route path='/search/userInfo/userMatchHistory' component={UserMatchHistory} />
                <Route path='/search/userInfo/userMasteries' component={UserMasteries} />
                <Route path='/search/userInfo/userInGame' component={UserInGame} />
                <Route path='/matchedGameDetail' component={MatchedGameDetail} />
                <Footer style={{ position: 'absolute', left: '0px', width: '100%', bottom: '0px' }} />
            </div>
        </BrowserRouter>
    )
}