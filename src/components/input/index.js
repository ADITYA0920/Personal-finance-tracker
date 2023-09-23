import React from 'react'
import "./style.css"
const Input = ({lable , state , setState ,placeholder}) => {
  return (
    <div className="input-wrapper">
        <p className="lable-input">{lable}</p>
        <input value={state}
        placeholder={placeholder}
        onChange={(e)=>setState(e.target.value)}
        className="custom-input"/>
    </div>
  )
}

export default Input ;