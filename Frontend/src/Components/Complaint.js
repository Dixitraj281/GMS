import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getproblemsuper, status_update } from '../utils/ApiRequest';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './complaint.css';

function Complaint({ handle_view }) {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axios.post(getproblemsuper);
        setRefresh(true);

        const currentTime = new Date();
        const filteredProblems = data.problem.filter(problem => {
          const problemTime = new Date(problem.createdAt);
          const timeDifference = currentTime - problemTime;
          return timeDifference > 300000 && problem.status === 'pending';
        });
        filteredProblems.forEach(problem => {
          console.log('Complaint forwarded to superadmin:', problem);
        });
        setProblems(filteredProblems);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    if (localStorage.getItem("super")) {
      fetchProblems();
    } else {
      navigate("/superadminlogin");
    }
  }, [refresh, navigate]);

  const handleViewClick = (image) => {
    handle_view(image);
    navigate('/image');
  };

  const handleShowLogout = () => {
    localStorage.removeItem("admin");
    navigate("/adminlogin");
  };

  return (
    <div>
      <header className='navbar'>
        <Link to='/superadmin' className='navbar__title navbar__item superadmin-home'>Super Admin Panel</Link>
        <Button variant='primary' onClick={handleShowLogout} className="ml-2">Logout</Button>
      </header>
      <div className="complaint-list">
        {problems.map(item => (
          <div className="complaint-item" key={item.id}>
            <div>
              <strong>Complaint Lodged On:</strong> {item.createdAt}
            </div>
            <div>
              <strong>Complaint Lodged By:</strong> {item.email}
            </div>
            <div>
              <strong>Subject:</strong> {item.problem}
            </div>
            <div>
              <strong>Status:</strong> {item.status}
            </div>
            <div>
              <strong>Image:</strong> <button onClick={() => handleViewClick(item.Image)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Complaint;
