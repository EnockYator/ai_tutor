
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./../../../axios"; // axiosInstance which allow sending cookies to backend

const initialState = {
    isAuthenticated : false,
    isLoading : false,
    user: null, // To store user data like role, name, etc.
    error: null, // To store any errors
    accessToken: null, // To store JWT token
};


// Register users
export const register = createAsyncThunk(
    'auth/register',
    async (userFormData, thunkAPI) => {
      try {
        const response = await axiosInstance.post('/auth/register', userFormData);
        return response.data; // The message will be in response.data.message
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Registration failed. Please try again.";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );


  // Login any registered user
  export const loginUser = createAsyncThunk(
    'auth/login',
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                '/auth/login',
                `username=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            
            localStorage.setItem('accessToken', response.data.access_token);
            return {
                accessToken: response.data.access_token,
                user: response.data.user,
                isAuthenticated: true
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.detail || "Login failed. Please try again."
            );
        }
    }
);

  // Logout User
  export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axiosInstance.post('/auth/logout');
            localStorage.removeItem('accessToken');
            return { message: "Logged out successfully" };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.detail || "Failed to log out. Please try again."
            );
        }
    }
);



  // Redux slice for authentication 

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      // On successful login
      setAuth(state, action) {
        state.isAuthenticated = true;
        state.user = action.payload.user; // You can store user data like role here
        state.accessToken = action.payload.accessToken; // Store token
      },
      // On successful logout
      resetAuth(state) {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      }
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user; // Update user with response data
                state.isAuthenticated = false; // Registration succeeded but not yet authenticated
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Store the error message
                state.isAuthenticated = false;
            })
            
            // login
            .addCase(loginUser.pending, (state) => {
              state.isLoading = true;
              state.error = null; 
              state.isAuthenticated = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user; // Update user with response data
                state.isAuthenticated = true; // Login succeeded
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Store the error message
                state.isAuthenticated = false;
            })
            // logout
            .addCase(logoutUser.pending, (state) => {
              state.isLoading = true;
              state.error = null; 
              state.isAuthenticated = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null; 
                state.isAuthenticated = false; // Logout succeeded
                //toast.success('Logged out successfully')
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Store the error message
                state.isAuthenticated = true;
            });

    },
});

export const { setAuth, resetAuth, logout } = authSlice.actions;
export default authSlice.reducer;



