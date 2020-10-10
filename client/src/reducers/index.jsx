import { regionReducer } from './region-reducer';
import { champsReducer } from './fetchChamps-reducer';
import { spellReducer } from './fetchSpells-reducer';
import { runesReducer } from './fetchRunes-reducer';
import { loginReducer } from './fetchLogin-reducer';
import { localStorageReducer } from './getLocalStorageData';
import { combineReducers } from 'redux';

export default combineReducers({
    regionStore: regionReducer,
    champStore: champsReducer,
    spellStore: spellReducer,
    runeStore: runesReducer,
    loginStore: loginReducer,
    localStorageStore: localStorageReducer,
});