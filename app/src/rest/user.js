import "regenerator-runtime/runtime";

import {
    generateToken
} from '../helpers/functions'

async function login(name, password) {
    const response = await fetch(`http://localhost:3000/users?name=${name}&password=${password}`)

    return response.json()
}

async function register(name, password) {
        const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            password: password,
            token: generateToken()
        })
    })

    return response.json()
}

async function updateUserToken({ name, password, id }) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            password: password,
            token: generateToken()
        })
    })

    return response.json()
}

function logoutUser() {
    window.sessionStorage.removeItem('user-token')

    return true
}

function getUserToken() {
    return window.sessionStorage.getItem('user-token')
}

async function getCurrentUserInfo() {
    const token = getUserToken()
    let response

    if (!token)
        return false

    response = await fetch(`http://localhost:3000/users?token=${token}`, {
        method: 'GET'
    })

    return response.json()
}

export default {
    getCurrentUserInfo,
    getUserToken,
    logoutUser,
    updateUserToken,
    register,
    login
}