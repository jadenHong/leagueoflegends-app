import { FETCH_SPELLS } from '../actions';

const spellsInitialState = {
    spells: [],
    isLoading: false,
    errorMessage: '',
}

export const spellReducer = (state = spellsInitialState, action) => {
    switch (action.type) {
        case `${FETCH_SPELLS}__PENDING`:
            return {
                ...state,
                isLoading: true,
                errorMessage: '',
            };
        case `${FETCH_SPELLS}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                spells: action.payload,

            };
        case `${FETCH_SPELLS}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                errorMessage: '',
            };

        default:
            return state;
    }
}