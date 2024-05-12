import React from 'react'
import "./auth.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {superregisterAPI} from '../utils/ApiRequest';
import axios from "axios"
function Superregistration() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }
  const navigate=useNavigate();
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [cpassword,setcpassword]=useState('');

const validate=async(e)=>{
    e.preventDefault();
if(password===cpassword){
const data = await axios.post(superregisterAPI, {name,email,password})
console.log(data.data.success);
if(data.data.success === true){
        delete data.data.user.password;
        localStorage.setItem("superadmin", JSON.stringify(data.data.user));
        toast.success(data.data.message, toastOptions);
        navigate("/superadmin");
      }
      else{
        toast.error(data.data.message, toastOptions);
      }     
}else{
alert('password not matched')
}
}
  return (
  <section>
    <div className="container">
      <div className="user signinBx">
        <div className="imgBx"><img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/reading_0re1.svg" /></div>
        <div className="formBx">
          <form method="POST">
          <div className="form">
            <h2>Create an account</h2>
            <input type="text" name="" placeholder="Username" value={name} 
                  onChange={(e)=>{setname(e.target.value)}}/>
            <input type="email" name="" placeholder="Email Address" value={email} 
                  onChange={(e)=>{setemail(e.target.value)}} />
            <input type="password" name="" placeholder="Create Password" autoComplete="on" value={password} 
                  onChange={(e)=>{setpassword(e.target.value)}} />
            <input type="password" name="" placeholder="Confirm Password" autoComplete="on" value={cpassword} 
                  onChange={(e)=>{setcpassword(e.target.value)}} />
            <button type="submit"  className="btn btn-success" onClick={validate}>Sign up</button>
            <p className="signup">
              Already have an account ?
              <Link to="/superadminlogin">Sign In.</Link>
            </p>
            </div>
          </form>
          </div>
        </div>
      </div>
  </section>
  )}

export default Superregistration