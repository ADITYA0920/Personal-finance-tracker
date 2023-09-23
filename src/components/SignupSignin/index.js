import React, { useState } from 'react'
import "./style.css"
import Input from '../input'
import Button from '../Button';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc ,getDoc} from "firebase/firestore"; 
import { FacebookAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth ,db ,provider} from '../../firebase';
import { useNavigate } from 'react-router-dom';
const SignUpSignIn = () => {
    const[name,setName] = useState("") ;
    const[email,setEmail] = useState("") ;
    const[password,setPassword] = useState("") ;
    const[consfirmPassword,setConfirmPassword] = useState("") ;
    const[loginForm ,setLoginForm] = useState(true) ;
    const[loading,setLoading] = useState(false) ;

    //navigator
    const navigate = useNavigate() ;

    function signUpWithEmail(){
        console.log("btn clicked");
      //
      setLoading(true) ;
      if(name !== "" && email !== "" && password !=="" && consfirmPassword !=="" ){
        if(password === consfirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("user->",user);
          createDoc(user) ;
          setLoading(false) ;
          toast.success("user created");
          navigate("/dashboard") ;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage) ;
          setLoading(false) ;
          // ..
        }); 
      }
      else{
        toast.error("passwords are not matching");
      }
      }
      else{
        toast.error("all fields are mandtory") ;
        setLoading(false) ;
      }
    }
    function googleAuth(){
      setLoading(true) ;
      try{
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setLoading(false) ;
          console.log("user-->",user) ;
          createDoc(user) ;
          navigate("/dashboard");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage) ;
          setLoading(false)
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
      }
    catch(e){
      toast.error(e.message) ; 
      setLoading(false) ;
    }

    }
    function loginUsingEmail(){
      console.log(email) ;
      console.log(password) ;
      setLoading(true) ;
      if(email !== "" && password !== ""){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          createDoc(user) ;
          toast.success("user created") ;
          setLoading(false) ;
          navigate("/dashboard") ;
          console.log("user -> ",user) ;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false) ;
          toast.error(errorMessage) ;
        });
      }
      else{
        toast.error("all field are mandetory") ;
        setLoading(false) ;
      }


    }
    
    async function createDoc(user){

      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userData = await getDoc(userRef);
  
      if (!userData.exists()) {
      try{
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName ? user.displayName : name ,
        email: user.email,
        photoURL : user.photoURL ? user.photoURL : "",
        createdAt : new Date()
      });
     toast.success("doc created")
      }
      catch(e){
        toast.error(e)
      }
    }
    else{
      toast.error("doc already exists");
    }
  }

  return (
    <>
    {loginForm ? (
      <div className="signup-wrapper">
      <h2 className='title'>
          Sign Up on <span style={{color:"var(--theme)"}}>Financly.</span>
      </h2>
      <form>
          <Input lable={"full Name"}
          type={"text"}
           state = {name} 
           setState = {setName} 
           placeholder={"John Mosh"} />

          <Input lable={"Email"}
          type={"email"}
           state = {email} 
           setState = {setEmail} 
           placeholder={"Josh@gmail.com"} />

          <Input lable={"Password"}
          type={"password"}
           state = {password} 
           setState = {setPassword} 
           placeholder={"Pass@123"} />

          <Input lable={"confirm password"}
          type={"password"}
           state = {consfirmPassword} 
           setState = {setConfirmPassword} 
           placeholder={"Pass@123"} />

          <Button disabel={loading} 
          text={loading ? "loading..." : "signUp using email and password"} 
          blue={false} 
          onClick={signUpWithEmail}/>

          <p className='p-login'>or</p>
          <Button disabel={loading} text={"signUp using google"} blue={true} onClick={googleAuth}/>
          <p className='p-login' onClick={()=>setLoginForm(!loginForm)}>Or Have an Account ? Click here</p>
      </form>

  </div>
    ) : (
      <div className='signup-wrapper'>
         <h2 className='title'>
          Sign Up on <span style={{color:"var(--theme)"}}>Financly.</span>
        </h2>
        <form>
        <Input lable={"Email"}
          type={"email"}
           state = {email} 
           setState = {setEmail} 
           placeholder={"Enter Email"} />

        <Input lable={"Password"}
        type={"password"}
          state = {password} 
          setState = {setPassword} 
          placeholder={"Enter Password"} />

        <Button disabel={loading} 
          text={loading ? "loading..." : "login using email and password"} 
          blue={false} 
          onClick={loginUsingEmail}/>

          {/* <p className='p-login'>or</p>
          <Button disabel={loading} text={"signUp using email and password"} blue={true} /> */}
          <p className='p-login' onClick={()=>setLoginForm(!loginForm)}>Or Don't Have an Account ? Click here</p>
        </form>
      </div>
    )}
    
    </>
  )
}

export default SignUpSignIn ;