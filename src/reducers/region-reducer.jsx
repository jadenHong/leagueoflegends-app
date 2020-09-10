import { CHANGE_REGION } from '../actions';

const initialState = {
    region: '',
}

export const regionReducer = (state = initialState.region, action) => {
    switch (action.type) {
        case CHANGE_REGION:
            return action.region;
        default:
            return state;
    }
}
