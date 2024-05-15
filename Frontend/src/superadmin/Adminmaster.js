import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { getadmin, delete_admin } from '../utils/ApiRequest';
import axios from 'axios';
import './adminmaster.css'
import SuperadminSidebar from '../Sidebar/SuperadminSidebar'

function Adminmaster() {
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
      <div className="row row-cols-md-3 row-cols-md-3 g-2">
        {adminuser.map((item, index) => (
          <div className="col" key={index}>
            <div className="admin-card" style={{ width: "18rem" }}>
              <img
                src="https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=1024x1024&w=is&k=20&c=r--oPfS14d-ybe3adW-c_oy6q1tCz1c16SN8h5EdoKk="
                className="card-img-top"
                alt="..."
              />
              <div className="admin-card-body">
                <h1 className="admin-card-title">{item.email}</h1>
                <p className="admin-card-text">Department: {item.department}</p>
                <p className="admin-card-text">Name: {item.name}</p>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => admindelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Adminmaster;

// import React, { useState, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
// import { useNavigate, Link } from 'react-router-dom';
// import { getadmin, delete_admin } from './utils/ApiRequest';
// import axios from 'axios';
// import './adminmaster.css'
// import Sidebar from './Sidebar/sidebar';

// function Adminmaster() {
//   const navigate = useNavigate();
//   const [adminuser, setAdminUser] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (localStorage.getItem("super")) {
//           const { data } = await axios.post(getadmin);
//           setAdminUser(data.admin);
//         } else {
//           navigate("/superadminlogin");
//         }
//       } catch (error) {
//         console.error('Error fetching admin data:', error);
//         // Handle error (e.g., redirect to an error page)
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   const handleShowLogout = () => {
//     localStorage.removeItem("super");
//     navigate("/superadminlogin");
//   };

//   const admindelete = async (id) => {
//     try {
//       const { data } = await axios.post(delete_admin, { id: id });
//       if (data.success) {
//         window.alert("Admin is deleted");
//         window.location.reload();
//       } else {
//         // Handle failure
//         console.error('Failed to delete admin');
//       }
//     } catch (error) {
//       console.error('Error deleting admin:', error);
//       // Handle error (e.g., show an error message)
//     }
//   };

//   return (
//     <>
//       <div className="admin-container">
//         <div className="admin-grid">
//           {adminuser.map((item, index) => (
//             <div className="admin-card" key={index}>
//               <img
//                 src="https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=1024x1024&w=is&k=20&c=r--oPfS14d-ybe3adW-c_oy6q1tCz1c16SN8h5EdoKk="
//                 className="card-img-top"
//                 alt="Profile"
//               />
//               <div className="card-body">
//                 <h3 className="card-title">{item.email}</h3>
//                 <p className="card-text">Department: {item.department}</p>
//                 <p className="card-text">Name: {item.name}</p>
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={() => admindelete(item._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Adminmaster;
