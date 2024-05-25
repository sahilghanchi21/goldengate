// import React from "react";
// import { IoMdLogOut } from "react-icons/io";
// import { clearUserData } from "../redux/features/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import ProfileList from "./ProfileList"; // Ensure this path is correct
// import Header from "../components/header/Header";

// const Admin = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogOut = async () => {
//     try {
//       dispatch(clearUserData());
//       navigate("/");
//     } catch (error) {
//       console.error("Failed to log out:", error);
//     }
//   };

//   return (
//     <div>
//       {/* <Header/> */}
//       <h1>Admin Dashboard!</h1>
//       <div className="logout-container">
//         <div className="logout-btn" onClick={handleLogOut}>
//           LogOut
//         </div>
//         <IoMdLogOut />
//       </div>
//       <ProfileList />
//     </div>
//   );
// };

// export default Admin;
// Admin.js
import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { clearUserData } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProfileList from "./ProfileList"; // Ensure this path is correct
import "./Admin.css"; // Create this CSS file for overall layout styling
import Sidebar from "./Sidebar/Sidebar";

const Admin = (props) => {
  const { children } = props;
  console.log(children, "propssssss");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      dispatch(clearUserData());
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="admin-container">
      <Sidebar /> {/* Include the Sidebar component */}
      <div className="main-content">
        <div className="header">
          <p style={{ width: "200px" }}>GoldenGate 🪙</p>
          <div className="logout-container" onClick={handleLogOut}>
            <div className="logout-btn">LogOut</div>
            <IoMdLogOut />
          </div>
        </div>
        {children}
        {/* <ProfileList /> */}
      </div>
    </div>
  );
};

export default Admin;
