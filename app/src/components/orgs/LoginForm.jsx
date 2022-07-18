import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import TextInput from '../atoms/TextInput'
import Button from '../atoms/Button'
import Checkbox from '../atoms/Checkbox'

import userRest from '../../rest/user'

function LoginForm() {
    const history = useHistory()
    const [name, setName] = useState(name || '')
    const [password, setPassword] = useState(password || '')
    const [createAccount, setCreateAccount] = useState(createAccount || false)
    const [error, setError] = useState(false)

    function updateName(e) {
        setName(e.target.value)
    }

    function updatePassword(e) {
        setPassword(e.target.value)
    }

    function updateCreateAccount(e) {
        setCreateAccount(e.target.checked)
    }

    function onSubmit() {
        if (!name || !password) {
            return setError(true)
        }

        userRest.login(name, password)
            .then(response => {
                if (!response.length && createAccount) {
                    userRest.register(name, password).then(response => {
                        if (response.token)
                            return finishLogin(response.token)
                        else
                            return setError(true)
                    })
                } else if (!response.length || response.length && createAccount) {
                    return setError(true)
                } else {
                    return response[0]
                }
            })
            .then(response => {
                response && userRest.updateUserToken(response)
                    .then(response => {
                        if (!response.token)
                            return false

                        return finishLogin(response.token)
                    })
            })
}

function finishLogin(token) {
    sessionStorage.setItem('user-token', token)
    history.push('/dashboard')
}

function getErrorMessage() {
    return error ? (
        <div className="alert alert-error">Incorrect username or password</div>
    ) : null
}

return (
    <div className='login-form'>
        <h2>Welcome</h2>
        {getErrorMessage()}
        <div>
            <TextInput
                name={'username'}
                label={'username'}
                onBlur={updateName}
                placeholder={'Username'}
                value={name}
            />
        </div>
        <div>
            <TextInput
                name={'password'}
                label={'password'}
                onBlur={updatePassword}
                placeholder={'Password'}
                value={password}
                type={'password'}
            />
        </div>
        <div>
            <Checkbox
                name={'create-account'}
                onChange={updateCreateAccount}
                value={createAccount}
                label={"I'm new, create an account"}
            />
        </div>
        <div>
            <Button
                id={'btn-login'}
                onClick={onSubmit}
                extraClasses={'primary full-width'}
            >
                Login
                </Button>
        </div>
    </div>
)
}

export default LoginForm