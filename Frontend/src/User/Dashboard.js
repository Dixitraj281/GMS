import React from 'react'
import './Dashboard.css'
import { useState,useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import {getproblem} from '../utils/ApiRequest';
import axios from 'axios';
import Sidebar from '../Sidebar/sidebar';

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
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
<>  
<Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
<div className="container">
      <table>
        <thead>
          <tr className='table-top'>
            <th>User Id</th>
            <th>Token No.</th>
            <th>Department</th>
            <th>Sub Department</th>
            <th>Problem Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className='table-text'>
          {userproblem.map(item => (
            <tr
             key={item.id}>
              <td>
                {item.user}
              </td>
              <td>
                {item.token}
              </td>
              <td>
                {item.department}
              </td>
              <td>
                {item.subdepartment}
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