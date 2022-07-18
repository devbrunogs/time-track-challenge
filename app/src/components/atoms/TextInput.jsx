import React, { useState } from "react"

function TextInput(props) {
    const {
        name,
        placeholder,
        value,
        onBlur,
        disabled,
        type
    } = props

    const [inputValue, setInputValue] = useState(value || '')

    function handleChange(e) {
        setInputValue(e.target.value)
    }

    function handleBlur(e) {
        onBlur && onBlur(e)
    }

    return (
        <>
            <input
                id={name}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={inputValue}
                placeholder={placeholder}
                disabled={disabled}
                type={type || 'text'}
            />
        </>
    )
}

export default TextInput