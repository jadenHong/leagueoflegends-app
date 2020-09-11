import { regionReducer } from './region-reducer';
import { champsReducer } from './fetchChamps-reducer';
import { spellReducer } from './fetchSpells-reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    regionStore: regionReducer,
    champStore: champsReducer,
    spellStore: spellReducer,
});