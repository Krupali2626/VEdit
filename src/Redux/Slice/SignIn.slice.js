import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: [],
    error: null,
    userInfo: null,
};

// Add data in http://localhost:1726/signup api during sign-up
export const signUp = createAsyncThunk(
    'auth/signUp',
    async (userData) => {
        console.log("userData", userData);
        try {
            const response = await fetch('http://localhost:1726/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log(data);

            return data;
        } catch (error) {
            throw new Error('An error occurred. Please try again.');
        }
    }
);

// Get all users from the API
export const GetUser = createAsyncThunk(
    'auth/GetUser',
    async () => {
        try {
            const response = await fetch('http://localhost:1726/signup', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            throw new Error('An error occurred. Please try again.');
        }
    }
);

// Async thunk for sign-in (now only validates credentials)
export const signIn = createAsyncThunk(
    'signIn/signIn',
    async (userData, { rejectWithValue }) => {
        try {
            // First, get all users
            const response = await fetch('http://localhost:1726/signup', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const users = await response.json();

            // Find the user with matching email and password
            const user = users.find(u => u.email === userData.email && u.password === userData.password);

            if (user) {
                return user; // Return the user if found
            } else {
                return rejectWithValue('Invalid email or password');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const signInSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(GetUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload; // Store the user info, not adding to the users array
                state.error = null;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { setUserInfo } = signInSlice.actions;

export default signInSlice.reducer;