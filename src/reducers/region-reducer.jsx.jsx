import { CHANGE_REGION } from '../actions/region-action';
import { combineReducers } from 'redux';

export const initailState = {
    region: '',
}

const regionReducer = (state = initailState.region, action) => {
    switch (action.type) {
        case CHANGE_REGION:
            return action.region;
        default:
            return state;
    }
}

export default combineReducers({
    regionStore: regionReducer,
})