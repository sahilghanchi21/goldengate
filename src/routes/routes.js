import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./appRoutes";
import Register from "../pages/auth/Auth";
import Home from "../pages/home/Home";
import NameRegister from "../pages/auth/Register/NameRegister";
import LocationRegister from "../pages/auth/Register/UserSkills";
import JonRegister from "../pages/auth/Register/JobRegister";
import UploadProfileImage from "../pages/auth/Register/UploadProfileImage";
import MyNetwork from "../pages/network/MyNetwork";
import Chat from "../pages/Chat/Chat";
import Notifications from "../pages/notification/Notifications";
import Business from "../pages/business/Business";
import Profile from "../pages/profile/Profile";
import GeminiChat from "../components/gemini";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "../admin";
const CustomRoutes = () => {
  return (
    <Routes>
      <Route path={AppRoutes.BASEURL} element={<Register title="Register" />} />
      <Route
        path={AppRoutes.HOME}
        element={
          <ProtectedRoute>
            <Home title="Home" />
          </ProtectedRoute>
        }
      />
      <Route
        path={AppRoutes.ADMIN}
        element={
          <ProtectedRoute>
            <Admin title="Admin-Dashboard" />
          </ProtectedRoute>
        }
      />
      {/* <ProtectedRoute path={AppRoutes.HOME} element={<Home title="Home" />} /> */}
      <Route path={AppRoutes.GEMINI} element={<GeminiChat title="Home" />} />
      <Route
        path={AppRoutes.REGISTER}
        element={<Register title="Register" />}
      />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
      <Route
        path={AppRoutes.REGISTERPROFILE}
        element={
          <ProtectedRoute>
            <NameRegister title="Register-personal-details" />
          </ProtectedRoute>
        }
      />
      <Route
        path={AppRoutes.REGISTERLOCATION}
        element={<LocationRegister title="Register-Location" />}
      />
      <Route
        path={AppRoutes.REGISTEJOB}
        element={<JonRegister title="Register-Job" />}
      />
      <Route
        path={AppRoutes.UPLOADPROFILEIMAGE}
        element={<UploadProfileImage title="Upload-Profile-Image" />}
      />
      <Route
        path={AppRoutes.MYNETWORK}
        element={<MyNetwork title="MyNetwork" />}
      />
      <Route path={AppRoutes.MESSAGING} element={<Chat title="messaging" />} />
      <Route
        path={AppRoutes.NOTIFICATIONS}
        element={<Notifications title="notification" />}
      />
      <Route
        path={AppRoutes.FORBUSINESS}
        element={<Business title="for-business" />}
      />
      <Route
        path={`${AppRoutes.PROFILE}/:userId`}
        element={<Profile title="user-profile" />}
      />
    </Routes>
  );
};

export default CustomRoutes;
