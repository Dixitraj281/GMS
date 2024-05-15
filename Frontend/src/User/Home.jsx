// Home.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getproblem } from '../utils/ApiRequest';
import './Home.css';
import Sidebar from '../Sidebar/sidebar';

const Home = () => {
  const [userProblem, setUserProblem] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblem = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.post(getproblem, {
        userId: user._id,
      });
      setUserProblem(data.problem);
    };

    if (localStorage.getItem("user")) {
      fetchProblem();
    } else {
      navigate("/login");
    }
  }, [refresh]);

  const userData = {
    name: 'User',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
  };
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
    <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <div className="content">
        <div className="welcome">
          <div className="user-info">
            <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
            <div>
              <h1>Hi {userData.name}!</h1>
            </div>
          </div>
          <p>Welcome back, {userData.name}! Here's what's happening:</p>

          <div className="user-problems">
            {userProblem.map((problem, index) => (
              <div key={index} className="problem-item">
                <p>{problem.description}</p>
                <p>Problem Status: {problem.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
