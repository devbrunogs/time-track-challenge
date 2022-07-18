import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import LoginForm from '../../../src/components/orgs/LoginForm';

import userRest from '../../../src/rest/user'

const loginSpy = jest.spyOn(userRest, 'login')
const tokenSpy = jest.spyOn(userRest, 'updateUserToken')
const registerSpy = jest.spyOn(userRest, 'register')

function setupFetchStub(data) {
    return function fetchStub(_url) {
        return new Promise((resolve) => {
            resolve({
                json: () =>
                    Promise.resolve(data)
            })
        })
    }
}

describe('Login Form Test', () => {
    let name, pwd, createAccount

    it('should not login with empty forms', () => {
        render(<LoginForm />)

        userEvent.click(screen.getByRole('button'))

        expect(loginSpy).toHaveBeenCalledTimes(0)
    })

    it('should login', () => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub([{id: 1, token: 1}]))
        render(<LoginForm />)

        name = screen.getByPlaceholderText('Username')
        pwd = screen.getByPlaceholderText('Password')

        userEvent.type(name, 'a')
        userEvent.type(pwd, 'a')

        expect(name.value).toBe('a')
        expect(pwd.value).toBe('a')

        userEvent.click(screen.getByText('Login'))

        setTimeout(() => {
            expect(tokenSpy).toHaveBeenCalledTimes(1)
            done()
        }, 200)
    })

    it('should register', () => {
        global.fetch = jest.fn().mockImplementation(setupFetchStub([]))
        render(<LoginForm />)

        name = screen.getByPlaceholderText('Username')
        pwd = screen.getByPlaceholderText('Password')
        createAccount = screen.getByLabelText("create-account")

        userEvent.type(name, 'a')
        userEvent.type(pwd, 'a')
        userEvent.click(createAccount)

        expect(createAccount.checked).toBe(true)

        userEvent.click(screen.getByText('Login'))

        setTimeout(() => {
            expect(registerSpy).toHaveBeenCalledTimes(1)
            done()
        }, 200)
    })
})