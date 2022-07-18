import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Dashboard from '../components/pages/Dashboard'

function PrivateRoutes() {
    const [value, setValue] = useState(
        sessionStorage.getItem('user-token')
    );

    useEffect(() => {
        setValue(sessionStorage.getItem('user-token'))
    }, [sessionStorage.getItem('user-token')])

    if (!value)
        return <Redirect to={'/login'} />

    return (
        <>
            <Route path={'/dashboard'}>
                <Dashboard />
            </Route>
        </>
    )
}

export default PrivateRoutes