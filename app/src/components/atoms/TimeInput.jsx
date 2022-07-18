import React, { useState, useEffect } from "react"

function TimeInput(props) {
    const {
        name,
        placeholder,
        value,
        onChange,
        disabled,
        hasError,
        min
    } = props

    const [inputValue, setinputValue] = useState(value)
    const [errorClass, setErrorClass] = useState(hasError)

    useEffect(() => setinputValue(value), [value])
    useEffect(() => setErrorClass(hasError), [hasError, disabled])

    function getClass() {
        let classes = "form-control"

        if (errorClass)
            classes += ' is-invalid'

        return classes
    }

    function handleChange(e) {
        if (min && min > e.target.value) {
            setErrorClass(true)
            return false
        }

        setErrorClass(false)
        onChange && onChange(e)
    }

    function getErrorMessage() {
        return (
            <div className='alert alert-error attached' aria-label={'error-message'}>
                Must not be lower than 06:00 AM or previous field
            </div>
        )
    }

    return (
        <>
            {errorClass ? getErrorMessage() : null}
            <input
                id={name}
                type='time'
                name={name}
                onChange={handleChange}
                value={inputValue}
                aria-label={'time'}
                placeholder={placeholder}
                className={getClass()}
                disabled={disabled}
                min={min}
            />
        </>
    )
}

export default TimeInput