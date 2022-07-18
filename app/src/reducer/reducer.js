import * as constants from '../helpers/constants'

const initialState = {
    userInfo: {},
    currentMonthData: {}
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case constants.ACTION_SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            }
        case constants.ACTION_SET_MONTH_ENTRIES:
            return {
                ...state,
                currentMonthData: action.payload
            }
        case constants.ACTION_CLEAN_UP:
            return initialState
        default:
            return state
    }
}

export default reducer