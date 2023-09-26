import React from 'react'
import "./style.css"
import google2 from "../../assets/google.png"
import email2 from "../../assets/email.png"
const Button = ({text , blue , onClick , disable}) => {
  return (
    <div>
        <p className= {blue ? "btn btn-blue" : "btn"} 
        onClick={onClick}>{text+"   "  }{text =="signUp using google" ? <img src={google2} id="google-img"/> : <></>}</p>
    </div>
  )
}

export default Button ;