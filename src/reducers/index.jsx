import { regionReducer } from './region-reducer';
import { champsReducer } from './fetchChamps-reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    regionStore: regionReducer,
    champStore: champsReducer,
});