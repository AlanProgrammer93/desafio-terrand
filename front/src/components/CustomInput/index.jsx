import React from 'react'
import './styles.css'

const CustomInput = ({ type = "text", name, value, placeholder, onChange }) => {
    return (
        <input
            className='custom_input'
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export default CustomInput