// redux 구현하기 위해서 redux, react-redux, redux-logger 설치해줌.

export const CHANGE_REGION = 'CHANGE_REGION';

export const changeRegion = (region) => {
    return {
        type: CHANGE_REGION,
        region,
    }
}