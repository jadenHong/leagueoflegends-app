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
            <div className="user-nav">
                {console.log(id)}
                <Link className="link" to={
                    {
                        pathname: '/search/userInfo/userMatchHistory',
                        state: {
                            gameIdInfo: gameIds,
                            accountId: accountId,
                        }
                    }}><span className='span'>Match History</span></Link>
                <Link className="link" to={
                    {
                        pathname: '/search/userInfo/userMasteries',
                        state: {
                            gameIdInfo: gameIds,
                            accountId: accountId,
                        }
                    }}><span className='span'>Masteries</span></Link>
                <Link className="link" to={
                    {
                        pathname: '/search/userInfo/userInGame',
                        state: {
                            gameIdInfo: gameIds,
                            accountId: accountId,
                        }
                    }}><span className='span'>In Game</span></Link>

            </div>

        </>
    )
}





