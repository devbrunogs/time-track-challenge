import React, { useState } from 'react'

function Checkbox(props) {
    const {
        name,
        value,
        onChange,
        disabled,
        label
    } = props

    const [inputValue, setInputValue] = useState(value || false)

    function handleChange(e) {
        setInputValue(e.target.checked)
        onChange && onChange(e)
    }

    return (
        <>
            <input
                id={name}
                type='checkbox'
                name={name}
                aria-label={name}
                onChange={handleChange}
                checked={inputValue}
                disabled={disabled}
            />
            <label htmlFor={name}>{label}</label>
        </>
    )
}

export default Checkbox