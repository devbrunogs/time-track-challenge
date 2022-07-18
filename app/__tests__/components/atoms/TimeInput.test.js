import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import TimeInput from '../../../src/components/atoms/TimeInput';
let onChangeSpy, input

function setup(min) {
    onChangeSpy = jest.fn()

    render(
        <TimeInput
            name={'time'}
            onChange={onChangeSpy}
            min={min}
        />
    )

    return screen.getByLabelText('time')
}

describe('TimeInput Test', () => {
    it('should render', () => {
        input = setup()

        expect(input).toBeTruthy()
    })

    it('should call change', () => {
        input = setup()

        userEvent.type(input, '1111')

        expect(input.classList.contains('is-invalid')).toBe(false)
    })

    it('should set error class if value is lower than min', () => {
        input = setup('23:00')

        userEvent.type(input, '1100')

        expect(input.classList.contains('is-invalid')).toBe(true)
    })

})