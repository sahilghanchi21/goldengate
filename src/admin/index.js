import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { clearUserData } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Admin = () => {
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
    <div>
      <h1>Admin Dashboard!</h1>
      <div className="logout-container">
        <div className="logout-btn" onClick={handleLogOut}>
          LogOut
        </div>
        <IoMdLogOut />
      </div>
    </div>
  );
};

export default Admin;
