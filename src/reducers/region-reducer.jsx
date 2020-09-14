import { CHANGE_REGION } from '../actions';

const initialState = {
    region: 'kr',
}

export const regionReducer = (state = initialState.region, action) => {
    switch (action.type) {
        case CHANGE_REGION:
            return action.region;
        default:
            return state;
    }
}
