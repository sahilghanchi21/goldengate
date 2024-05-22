import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "../auth/authServices";

const initialState = {
  isLoggedIn: false,
  user: null,
  userData: null,
  profileDetails: null,
  userPost: null,
  userProfileData: null,
  profileSkills: null,
  userProfileImage: null,
  userBackgroundImage: null,
  userPersonalInfo: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const response = await authService.register(userData);
      const user = response.data; // Assuming the response contains user information
      thunkApi.dispatch(updateUserInState(user)); // Dispatch action to update user in state
      console.log(response, "registered rsponse");
      return response.data;
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

// Register profile
export const registerProfile = createAsyncThunk(
  "auth/registerProfile",
  async (profileDetails, thunkApi) => {
    try {
      const token =
        thunkApi.getState().auth.user.token ??
        thunkApi.getState().auth.userData.token;
      console.log(token, "tokennnnnnnnnn"); // Get the token from the Redux store yaha nahi api call kar ne me but us se peh le token print karva ok
      const response = await authService.registerProfile(profileDetails, token); // Pass the token to the authService function
      return response.data; // Return the received profile details
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
// export const registerProfile = createAsyncThunk(
//   "auth/registerProfile",
//   async (profileDetails, thunkApi) => {
//     try {
//       const response = await authService.registerProfile(profileDetails);
//       console.log(response, "registerProfiled rsponse");
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkApi.rejectWithValue(errorMessage);
//     }
//   }
// );

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const response = await authService.login(userData);
      const user = response;
      thunkApi.dispatch(updateUserInState(user));
      console.log(user.data, "login user rsponse");
      return user.data;
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  "auth/logout",
  async (userData, thunkApi) => {
    try {
      const response = await authService.logout(userData);
      const user = response.data; // Assuming the response contains user information
      thunkApi.dispatch(updateUserInState(user)); // Dispatch action to update user in state
      console.log(response, "logout rsponse");
      return response.data;
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

// get user

export const fetchUserIdBySessionToken = createAsyncThunk(
  "auth/fetchUserIdBySessionToken",
  async (sessionToken, thunkAPI) => {
    try {
      const userId = await authService.getUserBySessionToken(sessionToken);
      console.log("userId: " + userId);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserDetailsById = createAsyncThunk(
  "auth/fetchUserDetailsById",
  async (userId, thunkAPI) => {
    try {
      const userDetails = await authService.getUserById(userId);
      return userDetails;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//get user profile
export const fetchProfileDetailsById = createAsyncThunk(
  "auth/fetchProfileDetailsById",
  async (userId, thunkAPI) => {
    try {
      const userDetails = await authService.getProfileById(userId);
      return userDetails;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkApi) => {
    try {
      const response = await authService.updateUser(userData);
      const user = response.data; // Assuming the response contains user information
      thunkApi.dispatch(updateUserInState(user)); // Dispatch action to update user in state
      return response;
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const updateUserInState = createAction(
  "auth/updateUserInState",
  (user) => ({
    payload: user,
  })
);

export const clearUserData = createAction("auth/clearUserData");

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    clearUserData(state) {
      // Clear user data when this action is dispatched
      state.isLoggedIn = false;
      state.user = null;
      // state.userData = null;
      // state.userProfileData = null;
      // state.userProfileImage = null;
      // state.userBackgroundImage = null;
      // state.userPersonalInfo = null;
    },
    updateUserInState(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    profilleImageRegister(state, action) {
      state.userBackgroundImage = action.payload;
    },
    registerAvatar(state, action) {
      state.userProfileImage = action.payload;
    },
    profilleInfoRegister(state, action) {
      state.userPersonalInfo = action.payload;
    },
    userPosts(state, action) {
      state.userPost = action.payload;
    },
    profileSkills(state, action) {
      state.profileSkills = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Register successful");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })
      // Register Profile
      .addCase(registerProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.profileDetails = action.payload; // Update profileDetails with the received data
        toast.success("registerProfile successful");
      })
      .addCase(registerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // .addCase(registerProfile.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(registerProfile.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.isLoggedIn = true;
      //   state.profileDetails = action.payload;
      //   toast.success("registerProfile successful");
      // })
      // .addCase(registerProfile.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.userProfileData = null;
      //   toast.error(action.payload);
      // })
      // Login User
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Login successful");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })
      // Logout User
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = action.payload;
        state.userData = action.payload;
        toast.success("Logout successful");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      // get User
      .addCase(fetchUserDetailsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.userData = action.payload;
        // toast.success("fetchUserDetailsById successful");
      })
      .addCase(fetchUserDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(fetchUserIdBySessionToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserIdBySessionToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        // toast.success("fetchUserIdBySessionToken successful");
      })
      .addCase(fetchUserIdBySessionToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      //get user Profile
      .addCase(fetchProfileDetailsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.userData = action.payload;
        // toast.success("fetchProfileDetailsById successful");
      })
      .addCase(fetchProfileDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("User updated successfully");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      });
  },
});

export const { beforeLogin, beforeRegister, fullName, job, location } =
  authSlice.actions;

export const {
  RESET_AUTH,
  profilleInfoRegister,
  userPosts,
  profileSkills,
  registerAvatar,
  profilleImageRegister,
} = authSlice.actions;

export default authSlice.reducer;
