
import { FETCH_CHAMPS } from '../actions';

const champsInitialState = {
    champs: [],
    isLoading: false,
    errorMessage: '',
}
export const champsReducer = (state = champsInitialState, action) => {
    switch (action.type) {
        case `${FETCH_CHAMPS}_PENDING`: {
            return {
                ...state,
                isLoading: true,
                errorMessage: '',
            }
        }
        case `${FETCH_CHAMPS}_FULFILLED`: {
            return {
                ...state,
                isLoading: false,
                champs: action.payload,
                errorMessage: '',
            }
        }
        case `${FETCH_CHAMPS}_REJECTED`: {
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        }
        default: return state;
    }
}

