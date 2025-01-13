import React from 'react'
import './styles.css'

const CustomTextarea = ({ name, value, placeholder, onChange }) => {
    return (
        <textarea
            className='custom_textarea'
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

export default CustomTextarea