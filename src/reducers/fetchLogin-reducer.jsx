import { FETCH_LOGIN } from '../actions';

const loginInitialState = {
    loginInfo: {},
    isLoading: false,
    errorMessage: '',
}

export const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case `${FETCH_LOGIN}_PENDING`: {
            return {
                ...state,
                isLoading: true,
                errorMessage: '',
            }
        }
        case `${FETCH_LOGIN}_FULFILLED`: {
            return {
                ...state,
                isLoading: false,
                loginInfo: action.payload,
                errorMessage: '',
            }
        }
        case `${FETCH_LOGIN}_REJECTED`: {
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        }
        default: return state;
    }
}