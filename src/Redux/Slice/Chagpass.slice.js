import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: [],
    error: null,
    currentUser: null,
    mobile: []
};

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (signUpData, { rejectWithValue }) => {
        try {
            console.log("Sending sign-up data:", signUpData);  // Debugging to ensure data is correct
            const response = await fetch('http://localhost:1726/signup', {
                method: 'POST',  // POST method is essential for data submission
                headers: {
                    'Content-Type': 'application/json'  // Ensure JSON data is sent
                },
                body: JSON.stringify(signUpData)  // Convert signUpData to JSON for the request body
            });

            if (!response.ok) {
                // If response status is not 200-299, throw an error
                throw new Error(`Failed to sign up: ${response.status}`);
            }

            const data = await response.json();  // Parse response JSON data
            return data;  // Return parsed data as the payload
        } catch (error) {
            console.error('Sign-up error:', error);  // Log errors for debugging
            return rejectWithValue(error.message);  // Handle error with rejection
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
        .addCase(signUp.fulfilled, (state, action) => {
            state.isLoading = false;  
            state.user = action.payload;  
            state.error = null;  
        })
    }
});
export const { setUserInfo } = signInSlice.actions;

export default signInSlice.reducer;