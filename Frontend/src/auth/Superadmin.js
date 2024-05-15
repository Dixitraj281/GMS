import React from 'react'
import "./auth.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { superloginAPI } from '../utils/ApiRequest';
import axios from 'axios';
function Superadmin() {
  const navigate=useNavigate();
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');

  const logged_in=async(e)=>{
    e.preventDefault();
          const user={email,password};
          if(!email || !password){
            alert("kindly fill the details")
          }else{
          try {
                    const data = await axios.post(superloginAPI, user);
                    console.log(data.user);
                    if (data.data.success === true) {
                      localStorage.setItem("super", JSON.stringify(data.data.user));
                      // localStorage.setItem('auth', JSON.stringify(data.data.token));
                      navigate("/superadmin/dashboards-a");
                      // toast.success(data.data.message, toastOptions);
                    } else {
                      // toast.error(data.data.message, toastOptions);
                    }
              } catch (error) {
                    console.error("login failed:", error);
                    alert("login failed");
                  }
        }
      }
  return (
    <body>
    <section>
      <div className="container-login">
        <div className="user signinBx">
          <div className="imgBx"><img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/reading_0re1.svg" /></div>
          <div className="formBx">
            <form method="POST">
              <h2>SuperAdmin Sign In</h2>
              <input type="text" name="" placeholder="Email" value={email} 
                  onChange={(e)=>{setemail(e.target.value)}} />
              <input type="password" name="" placeholder="Password" value={password} 
                  onChange={(e)=>{setpassword(e.target.value)}}/>
              <button type="submit" className="btn btn-success" onClick={logged_in}>Submit</button>
              
              <p className="signup">
                <Link to="/adminlogin" >Admin Login</Link>
              </p>
              <p className="signup">
              <Link to="/login" >User Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </body>     
    
  )
}

export default Superadmin