import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Button from '../../../src/components/atoms/Button';
let onClickSpy, button

function setup(min) {
    onClickSpy = jest.fn()

    render(
        <Button
            name={'button'}
            onClick={onClickSpy}
            min={min}
        >
            Click Me
        </Button>
    )

    return screen.getByText('Click Me')
}

describe('Button Test', () => {
    it('should render', () => {
        button = setup()

        expect(button).toBeTruthy()
    })

    it('should call onClick', () => {
        button = setup()

        userEvent.click(button)

        expect(onClickSpy).toHaveBeenCalledTimes(1)
    })
})