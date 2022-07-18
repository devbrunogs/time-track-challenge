import React from 'react'

function Button(props) {
    const {
        id,
        name,
        children,
        onClick,
        extraClasses
    } = props

    function getButtonClasses() {
        return `btn ${extraClasses}`
    }

    function handleClick(e) {
        e.preventDefault()
        onClick && onClick()
    }

    return (
        <button
            id={id}
            aria-label={name}
            className={getButtonClasses()}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default Button