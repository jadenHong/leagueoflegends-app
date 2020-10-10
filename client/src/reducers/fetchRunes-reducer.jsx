import { FETCH_RUNES } from '../actions';

const runesInitialState = {
    runes: [],
    isLoading: false,
    errorMessage: '',
}

export const runesReducer = (state = runesInitialState, action) => {
    switch (action.type) {
        case `${FETCH_RUNES}_PENDING`:
            return {
                ...state,
                isLoading: true,
                errorMessage: '',
            };
        case `${FETCH_RUNES}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                runes: action.payload,
            };
        case `${FETCH_RUNES}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                errorMessage: '',
            };
        default:
            return state;
    }
}