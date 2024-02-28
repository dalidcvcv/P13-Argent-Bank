import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authenticateUser, changeUserProfile, getUserProfile } from '../api';

const initialState = {
  loggedIn: false,
  token: null,
  user: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const loginResponse = await authenticateUser(userData.email, userData.password);
      const { token } = loginResponse.data.body; 
      localStorage.setItem('authToken', token);

      // Utilisation du token pour récupérer les informations user
      const userProfileResponse = await getUserProfile(token);
      const user = userProfileResponse.data.body;

      return { token, user };
    } catch (error) {
      console.error('Login failed:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (updatedProfile, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; 
      const response = await changeUserProfile(updatedProfile, token);
      return response.data.body;
    } catch (error) {
      console.error('Profile update failed:', error); 
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      ('Signing out user'); 
      state.loggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
