<div className="wrap">
    {console.log(id)}
    <div className="search">
        {/* <input type="text" className="summoner-id" placeholder="Enter the Summoner's ID" onChange={e => setSummonerID(e.target.value)} value={summonerID} /> */}
        <input type="text" className="searchTerm" placeholder="Enter the Summoner's ID" onChange={handleChange} />
        <button type="submit" className="searchButton" onClick={handleClick}>
            <FaSearch />
        </button>
    </div>
    <div className="summoner-info">
        {
            shouldRenderBody &&
            <div>
                <img src={`${API.GET_PROFILEICON}/${profileIconId}.png`} alt="profileIcon" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
                <h2>{name}</h2>
                <h3>{level}</h3>
                <img src={require(`../images/ranked-emblems/${tier}.png`)} alt="tier-emblem" style={{ width: '100px', height: '100px' }} />
                <h3>{tier}</h3>
                <h3>{`Win: ${wins} losses: ${losses} Rate: ${Math.round(wins / (wins + losses) * 100)}%`}</h3>
                <h3>LP: {leaguePoints} LP</h3>
                <h3>{rank}</h3>
                <h3>{queueType}</h3>
            </div>
        }
    </div>
</div>