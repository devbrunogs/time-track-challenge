import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Checkbox from '../../../src/components/atoms/Checkbox';
let onChangeSpy, checkbox

function setup(min) {
    onChangeSpy = jest.fn()

    render(
        <Checkbox
            name={'checkbox'}
            onChange={onChangeSpy}
            min={min}
        />
    )

    return screen.getByLabelText('checkbox')
}

describe('Checkbox Test', () => {
    it('should render', () => {
        checkbox = setup()

        expect(checkbox).toBeTruthy()
    })

    it('should call onClick', () => {
        checkbox = setup()

        userEvent.click(checkbox)

        expect(onChangeSpy).toHaveBeenCalledTimes(1)
    })
})