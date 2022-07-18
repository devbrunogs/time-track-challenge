import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import TextInput from '../../../src/components/atoms/TextInput';

const setup = () => {
    render(<TextInput name={'text'} placeholder={'text'} />)
}

describe('textInput Test', () => {
    render(<TextInput name={'text'} placeholder={'text'} />)
    let input = screen.getByPlaceholderText('text')

    it('should render', () => {
        setup()

        expect(input).toBeTruthy()
    })

    it('should call blur', () => {
        setup()

        fireEvent.change(input, { target: { value: '23' } })

        expect(input.value).toBe('23')
    })

})