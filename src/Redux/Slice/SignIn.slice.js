import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: [],
    error: null,
    currentUser: null,
    mobile: []
};

// Add data in http://localhost:1726/signup api during sign-up
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

// Updated signIn thunk
export const signIn = createAsyncThunk(
    'signIn/signIn',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:1726/signup');
            const users = await response.json();

            const user = users.find(u => u.email === userData.email && u.password === userData.password);
            console.log(user)

            if (user) {
                return {
                    ...user,
                    requireSecurityQuestions: true
                };
            } else {
                return rejectWithValue('Invalid email or password');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// New thunk for verifying security questions
export const verifySecurityQuestions = createAsyncThunk(
    'signIn/verifySecurityQuestions',
    async ({ user, answers }, { rejectWithValue }) => {
        try {
            // We already have the user data, so no need to fetch it again
            const userData = user;

            // Verify the answers
            const isCorrect = userData.additional.securityQuestions.every((question, index) =>
                question.answer.toLowerCase() === answers[index].toLowerCase()
            );

            if (isCorrect) {
                return userData; // Return full user data if answers are correct
            } else {
                return rejectWithValue('Incorrect answers to security questions');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ email, newPassword }, { rejectWithValue }) => {
        try {
            // First, get all users
            const getUserResponse = await fetch('http://localhost:1726/signup');
            const users = await getUserResponse.json();

            // Find the user to update
            const userToUpdate = users.find(user => user.email === email);
            // Update the user's password
            userToUpdate.password = newPassword;

            // Send the update request
            const updateResponse = await fetch(`http://localhost:1726/signup/${userToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userToUpdate)
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update password');
            }

            const updatedUser = await updateResponse.json();
            console.log("updatedUser : ", updatedUser)
            return updatedUser;
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
            .addCase(GetUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(verifySecurityQuestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(verifySecurityQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                console.log("action", action.payload)
                state.isLoading = false;
                state.currentUser = action.payload;
                state.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { setUserInfo } = signInSlice.actions;

export default signInSlice.reducer;
