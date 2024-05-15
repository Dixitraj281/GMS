import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getadmin, delete_admin } from '../utils/ApiRequest';
import axios from 'axios';
import "./manageusers.css";
import SuperadminSidebar from '../Sidebar/SuperadminSidebar';

function Manageusers() {
  const navigate = useNavigate();
  const [adminuser, setAdminUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("super")) {
          const { data } = await axios.post(getadmin);
          setAdminUser(data.admin);
        } else {
          navigate("/superadminlogin");
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
        // Handle error (e.g., redirect to an error page)
      }
    };

    fetchData();
  }, [navigate]);

  const admindelete = async (id) => {
    try {
      const { data } = await axios.post(delete_admin, { id: id });
      if (data.success) {
        window.alert("Admin is deleted");
        window.location.reload();
      } else {
        // Handle failure
        console.error('Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      // Handle error (e.g., show an error message)
    }
  };
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  
  return (
    <>
    <SuperadminSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <div className="user-grid">
        {adminuser.map((item, index) => (
          <div className="user-card" key={index}>
            <img
              src="https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=1024x1024&w=is&k=20&c=r--oPfS14d-ybe3adW-c_oy6q1tCz1c16SN8h5EdoKk="
              className="card-img-top"
              alt="Profile"
            />
            <div className="user-card-body">
              <h3 className="user-card-title">Email: {item.email}</h3>
              <p className="user-card-text">Selected Department: {item.department}</p>
              <p className="user-card-text">User Name: {item.name}</p>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => admindelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Manageusers;
