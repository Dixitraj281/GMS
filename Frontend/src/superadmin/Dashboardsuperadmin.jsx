import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserCount, getAdminCount } from '../utils/ApiRequest';
import "./dashboardsuperadmin.css";
import SuperadminSidebar from '../Sidebar/SuperadminSidebar';

const Dashboardsuperadmin = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("super")) {
          const { data: userData } = await axios.get(getUserCount);
          setUserCount(userData.count);
          const { data: adminData } = await axios.get(getAdminCount);
          setAdminCount(adminData.count);
        } else {
          navigate("/superadminlogin");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., redirect to an error page)
      }
    };

    fetchData();
  }, [navigate]);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  
  return (
    <>
    <SuperadminSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <table className="dashboard-table w-90">
        <thead>
          <tr>
            <th>Section</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Overview Section:</strong></td>
            <td>
              <ul>
                <li>Total Number of Users: {userCount}</li>
                <li>Total Number of Admins: {adminCount}</li>
                <li>Total Number of Super Admins: 01</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Dashboardsuperadmin;
