import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect } from "react-router-dom";

import Login from '../components/pages/Login'
import PrivateRoutes from './PrivateRoutes'

function Router() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading)
        return <h1>Carregando</h1>

    return (
        <>
            <Switch>
                <Route exact path={`/`}>
                    <Redirect to={'/dashboard'}/>
                </Route>
                <Route path={`/login`}>
                    <Login />
                </Route>
                <PrivateRoutes />
                <Route component={Fail} />
            </Switch>
        </>
    )
}

function Fail() {
    return <h1>404 or not Found</h1>
}

export default Router