import LoginStyle from './LoginStyle.module.css'
import {useEffect, useState} from 'react'
import useRpc from '../../Hooks/rpcHooks/useRpc';
import { LoadingAnimation } from './LoadingElement/LoadingAnimation';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
const style  = LoginStyle
const [userName,setUserName] = useState('')
const [password,setPassword] = useState('')
const[message,setMessage] = useState('')
const{data,loading,error,clientLogin,clientProve} = useRpc()
const[passwordWarning,setPasswordWarning] = useState('')
const[userNameWarning,setuserNameWarning] = useState('')
const navigate = useNavigate()
useEffect(()=>{
  console.log(data)
 if(data?.result ==='ok'){
    console.log(data)
  // window.location.href = "@";
  navigate('/home')
 }
 if(data?.error){
  console.log(data.error,"From client")
  if(data.error.message === 'Invalid credentials. Forgot password? Request a <a href="/resetpassword">secure reset</a>!') setPasswordWarning("Wrong password")
  setMessage(data.error.message)
 }
  
},[data])

async function handdleSubmit(e){
e.preventDefault()
console.log({loading})
if(password !=='' && userName !==''){
  console.log("Client loin started")
  await clientLogin(userName,password) //Entering parameters for the function
}
else{
  if(password ==='')setPasswordWarning("Password is required")
  
  if(userName ==='') setuserNameWarning("User name is required")
 
  setTimeout(()=>{setPasswordWarning('');setuserNameWarning('')}, 5000)
}

}


  return (
    
    <div className={style.containerFormHolder}>
      {  loading? <LoadingAnimation/> : <form onSubmit={(e)=>{handdleSubmit(e)}} className={style.formMain}>
      <h1>Welcome back</h1>
        <div className={style.inputHolder}>
            <label>User name</label>
            <input type="text" value={userName}  onChange={e=>setUserName(e.target.value)}/>
            <p className={style.warrning}>{userNameWarning}</p>
        </div>
        <div className={style.inputHolder}>
            <label>password</label>
            <input type="password"  onChange={e=>setPassword(e.target.value)} />
            <p className={style.warrning}>{passwordWarning}</p>
        </div>
        <button>Login</button>
        <p>Don't have an account? Sign up</p>
      </form> }
     
      
    </div>
  );
};
