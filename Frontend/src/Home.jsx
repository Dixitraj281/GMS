import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { getproblem } from './utils/ApiRequest';

const Home = () => {
  const [userproblem,setuserproblem]=useState([]);
  const [refresh, setRefresh] = useState(false);
  const [userProblem, setUserProblem] = useState([]);
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
  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }
  const userData = {
    name: 'Shashank Patidar',
    role: 'User',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg', // Example profile picture URL
  };
  return (
    <>  
<div style={{ display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
  <h2 style={{ margin: '1%' }}>Home</h2>
  <h1 style={{marginLeft:'22%'}}>Grievance Management System</h1>
</div>

<div className="sidenavbar">
<Link to="/">Home</Link>
<Link to="/history">History</Link>
<Link to='/new'>Grievance</Link>
<Button variant='primary' onClick={handleShowLogout} className="btn btn-primary btn-block my-4">Logout</Button>
</div>  
<div className="content" style={{ marginLeft: '500px', marginTop:'50px' }}>
  <div className="welcome">
    <div className="user-info">
            <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
            <div>
              <h1>{userData.name}</h1>
              <p>{userData.role}</p>
            </div>
          </div>
          <p>Welcome back, {userData.name}! Here's what's happening:</p>

        {/* Render user problems here */}
        <div className="user-problems ">
          {userProblem.map((problem, index) => (
            <div key={index} className="problem-item">
              {/* Render problem details */}
              <p>{problem.description}</p>
              <p>Status: {problem.status}</p>
            </div>
          ))}
        </div>   
      </div> 
    </div>   
</>
  )
}

export default Home