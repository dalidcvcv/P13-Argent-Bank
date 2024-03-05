import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authenticateUser, changeUserProfile, getUserProfile } from '../api';

const initialState = {
  loggedIn: false, 
  token: null,
  user: null,
};

// Thunk pour la connexion utilisateur
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const loginResponse = await authenticateUser(userData.email, userData.password);
      const { token } = loginResponse.data.body; 
      localStorage.setItem('authToken', token);// Stockage du token

      // Utilisation du token pour récupérer les informations user
      const userProfileResponse = await getUserProfile(token);
      const user = userProfileResponse.data.body; // Récupération des infos utilisateur

      return { token, user };
    } catch (error) {
      console.error('Login failed:', error);
      return rejectWithValue(error.message);// Gestion de l'erreur
    }
  }
);

// Thunk pour la Màj profil
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

// Slice d'authentification
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {// Reducer pour déconnexion
      ('Signing out user'); 
      state.loggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('authToken');// Suppression du token
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {// Connexion réussie
        state.loggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {// Màj réussie
        state.user = action.payload;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
