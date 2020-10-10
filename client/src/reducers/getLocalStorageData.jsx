import { GET_LOCALSTORAGE } from '../actions';

const localStorageInitialState = {
    errorMessage: '',
    localData: JSON.parse(localStorage.getItem('user')),
    isLoading: false,
}

export const localStorageReducer = (state = localStorageInitialState, action) => {
    switch (action.type) {
        case `${GET_LOCALSTORAGE}_PENDING`:
            return {
                ...state,
                errorMessage: '',

            }
        case `${GET_LOCALSTORAGE}_FULFILLED`: {
            return {
                ...state,
                isLoading: false,
                localData: action.localData,
                errorMessage: '',
            }
        }
        case `${GET_LOCALSTORAGE}_REJECTED`: {
            return {
                ...state,
                isLoading: false,
                errorMessage: action.nickname,
            }
        }
        default:
            return state;
    }
}