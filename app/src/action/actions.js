import * as constants from '../helpers/constants'

export const setUserInfo = (payload) => ({
    type: constants.ACTION_SET_USER_INFO,
    payload
})

export const setMonthData = (payload) => ({
    type: constants.ACTION_SET_MONTH_ENTRIES,
    payload
})

export const cleanup = () => ({
    type: constants.ACTION_CLEAN_UP,
})