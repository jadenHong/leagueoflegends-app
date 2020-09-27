export const API_BASE = 'http://localhost:7779';
export const USER_BASE = 'http://localhost:7779/user';
export const API = {
    GET_SUMMONER_BY_NAME: `${API_BASE}/lol/summoner/v4/summoners/by-name`,
    GET_SUMMONER_DETAIL_BY_ID: `${API_BASE}/lol/league/v4/entries/by-summoner`,
    GET_CHAMPION_SQUARE_IMG: `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion`,
    GET_ITEMS_IMG: `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/item`,
    GET_SPELLS_IMG: `http://ddragon.leagueoflegends.com/cdn/10.18.1/img/spell`,
    GET_RUNES_IMG: `https://ddragon.leagueoflegends.com/cdn/img`,
    GET_CHAMPIONS: `http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion`,
    GET_SKINS: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash`,
    GET_RANKS: `${API_BASE}/lol/league-exp/v4/entries/RANKED_SOLO_5x5`,
    GET_PROFILEICON: `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon`,
    GET_MATCH_ID: `${API_BASE}/lol/match/v4/matchlists/by-account`,
    GET_MATCH_DETAILS: `${API_BASE}/lol/match/v4/matches`,
    GET_MASTERY: `${API_BASE}/lol/champion-mastery/v4/champion-masteries/by-summoner`
}

export const TIER = {
    CHALLENGER: 'CHALLENGER',
    GRANDMASTER: 'GRANDMASTER',
    MASTER: 'MASTER',
    DIAMOND: 'DIAMOND',
    PLATINUM: 'PLATINUM',
    GOLD: 'GOLD',
    SILVER: 'SILVER',
    BRONZE: 'BRONZE',
    IRON: 'IRON',
}

export const DIVISIONS = [
    'I',
    'II',
    'III',
    'IV'
]