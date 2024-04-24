import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API;
export const API_URL = `${BACKEND_URL}`;

//Register user
const register = async (userData) => {
  const response = await axios.post(
    API_URL + "/api/v1/auth/register",
    userData
    
  );
  return response;
};

//Register profile
const registerProfile = async (userData) => {
  const response = await axios.post(API_URL + "/api/v1/profiles", userData, {
    // withCredentials: true,
  });
  return response;
};

//Login user
const login = async (userData) => {
  console.log(userData, "login");
  const response = await axios.post(API_URL + "/api/v1/auth/authenticate", userData);
  return response;
};

const logout = async (userData) => {
  console.log(userData, "logout");
  const response = await axios.post(
    API_URL + "/api/auth/logout",
    JSON.stringify(userData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

// Get User By SesssionToken
const getUserBySessionToken = async (sessionToken) => {
  const response = await axios.get(
    `${API_URL}/api/auth/user`,
    JSON.stringify(sessionToken),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response; // Assuming the response contains the user ID
};

const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/api/users/${userId}`);
  return response.data;
};
//get profile by id
const getProfileById = async (profileId) => {
  const response = await axios.get(`${API_URL}/api/profiles/${profileId}`);
  return response.data;
};

//Get login status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "/getLoginStatus");
  return response.data;
};

//Update User Profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "/updateUser", userData);
  return response.data;
};

//Update User Photo
const updatePhoto = async (userData) => {
  const response = await axios.patch(API_URL + "/updatePhoto", userData);
  return response.data;
};

const authService = {
  register,
  registerProfile,
  login,
  logout,
  getLoginStatus,
  getUserBySessionToken,
  getUserById,
  getProfileById,
  updateUser,
  updatePhoto,
};

export default authService;
