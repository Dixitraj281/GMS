import React from 'react'
import '../src/Dashboard.css'
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {getproblem} from '../src/utils/ApiRequest';
import axios from 'axios';

function Dashboard() {
  const [userproblem,setuserproblem]=useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate=useNavigate();

useEffect(() => {
  const fetch_problem=async()=>{
    const user = JSON.parse(localStorage.getItem("user"))
  const {data} = await axios.post(getproblem,{
    userId: user._id,
  });
  setuserproblem(data.problem);

  console.log(data.problem);
  }
  if (localStorage.getItem("user") ){
    fetch_problem();
  }else{
    navigate("/login");
  }
  
}, [refresh]);

  useEffect(() => {
    // handlemiddleware();
    const authuser = async () => {
      if (localStorage.getItem("user") 
    ){
        const user = JSON.parse(localStorage.getItem("user"));
        setRefresh(true);
      } 
      else {
        navigate("/login");
      }
    };

    authuser();
  }, [navigate]);

  

const handleShowLogout = () => {
  localStorage.removeItem("user");
  navigate("/login");
}
  return (
<>  
<div style={{ display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
  <h2 style={{ margin: '1%' }}>History</h2>
  <h1 style={{marginLeft:'22%'}}>Grievance Management System</h1>
</div>

<div className="sidenavbar">
<Link to="/">Home</Link>
<Link to="/history">History</Link>
<Link to='/new'>Grievance</Link>
<Button variant='primary' onClick={handleShowLogout} className="btn btn-primary btn-block my-4">Logout</Button>
</div>  
<div className="container">
      <table>
        <thead>
          <tr>
            <th>Token No.</th>
            <th>Problem Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userproblem.map(item => (
            <tr
             key={item.id}>
              <td>
                {item.token}
              </td>
              <td>
                {item.problem}
              </td>
              <td>
                {item.status}
              </td>
            </tr>
            ))}
        </tbody>

      </table>
    </div>     
</>

  )
}

export default Dashboard