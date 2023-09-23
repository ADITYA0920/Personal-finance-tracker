import React from 'react'
import "./style.css"
const Button = ({text,blue,onClick}) => {
  return (
    <div>
        <p className= {blue ? "btn btn-blue" : "btn"} onClick={onClick}>{text}</p>
    </div>
  )
}

export default Button ;