import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Menu, Footer } from '.';

import { Search, Champions, ChampionDetail } from '.';

export default () => {
    return (
        <BrowserRouter>
            <Menu />
            <Route exact path="/" component={Search} />
            <Route path="/champions" component={Champions} />
            <Route path="/champion/detail/:name" component={ChampionDetail} />
            <Footer />
        </BrowserRouter>
    )
}