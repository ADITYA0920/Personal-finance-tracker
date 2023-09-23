import React, { useEffect } from 'react'
import "./style.css" ;
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Header = () => {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate() ;
  // react-fireBase-Hooks
  useEffect(()=>{
    if(user){
      navigate("/dashboard") ;
    }
  },[user,loading]) ;
  function logout(){
    alert("logout") ;
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
      toast.success("logout succesfully") ;
    }).catch((error) => {
      // An error happened.
      toast.error(error) ;
    });
  }
  return (
    <div className='navbar'>
    <p className='logo'>financly.</p>
    {
      user &&  
      <div style = {{display : 'flex' , alignItems : "center" , gap : "0.5rem"}}>
        <img src={user.photoURL ? user.photoURL : "" }
        style = {{borderRadius : "50%" , height : "2rem" , width : "2rem"}}
         />
      <p className="logo link "onClick={logout}>Logout</p>
      </div>
    }
   
    </div>
  )
}

export default Header ;