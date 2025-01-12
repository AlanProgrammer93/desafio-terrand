import React from 'react'
import './styles.css'

const CustomButton = ({ onClick, text }) => {
    return (
        <button className='custom_button' onClick={onClick}>
            {text}
        </button>
    )
}

export default CustomButton