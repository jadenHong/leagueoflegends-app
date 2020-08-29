import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Menu, Footer } from '.';

import { Main, Search, Champions, ChampionDetail, Ranks } from '.';

export default () => {
    return (
        <BrowserRouter>
            <Menu />
            <Route exact path="/" component={Main} />
            <Route path="/search" component={Search} />
            <Route path="/champions" component={Champions} />
            <Route path="/champion/detail/:name" component={ChampionDetail} />
            <Route path="/ranks" component={Ranks} />
            <Footer />
        </BrowserRouter>
    )
}