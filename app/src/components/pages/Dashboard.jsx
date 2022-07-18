import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Button from '../atoms/Button'
import Hourstable from '../templates/HoursTable'

import {
    setUserInfo,
    setMonthData,
    cleanup
} from '../../action/actions'

import restUser from '../../rest/user'

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    currentMonthData: state.currentMonthData
});

const mapDispatchToProps = dispatch => {
    return {
        setUserInfo: info => dispatch(setUserInfo(info)),
        setMonthData: info => dispatch(setMonthData(info)),
        cleanup: () => dispatch(cleanup())
    }
}

function Dashboard(props) {
    const {
        userInfo,
        setUserInfo,
        setMonthData,
        getCurrentMonthData,
        currentMonthData,
        cleanup
    } = props

    const history = useHistory()

    useEffect(() => {
        restUser.getCurrentUserInfo()
            .then(res => {
                setUserInfo({
                    id: res[0].id,
                    name: res[0].name
                })
            })
    }, [])

    function handleLogout() {
        cleanup()
        if (restUser.logoutUser()) {
            sessionStorage.removeItem('user-token')
            history.push('/login')
        }
    }

    if (!userInfo.id)
        return "loading"

    return (
        <>
            <div className='header'>
                <div>Hello {userInfo.name}</div>
                <Button extraClasses='secondary-action' onClick={handleLogout}>Log out</Button>
            </div>
            <div className='main-wrapper'>
                <div className='main-content'>
                    <Hourstable
                        userInfo={userInfo}
                        currentMonthData={currentMonthData}
                        setMonthData={setMonthData}
                        getCurrentMonthData={getCurrentMonthData}
                    />
                </div>
            </div>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)