import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export const UserInfo = () => {

    const USER_ID = 'user account id';
    const location = useLocation();
    console.log(location.state)
    const { id, accountId } = location.state;
    const [...gameIds] = location.state.gameIdInfo;

    return (
        <>
            <div>
                {console.log(id)}
                <Link to={
                    {
                        pathname: '/search/userInfo/userMatchHistory',
                        state: {
                            gameIdInfo: gameIds,
                            accountId: accountId,
                        }
                    }}>Match History</Link>
                <Link to={
                    {
                        pathname: '/search/userInfo/userMasteries',
                        state: {
                            gameIdInfo: gameIds,
                            accountId: accountId,
                        }
                    }}>Masteries</Link>
                <Link to={
                    {
                        pathname: '/search/userInfo/userInGame',
                        state: {
                            gameIdInfo: gameIds,
                            accountId: accountId,
                        }
                    }}>In Game</Link>

            </div>

        </>
    )
}





