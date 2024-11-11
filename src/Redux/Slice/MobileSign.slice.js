import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state definition with TypeScript-like comments
const initialState = {
    user: null,          // Current user info
    loading: false,      // Loading state for API calls
    error: null,         // Error messages
    isAuthenticated: false,  // Authentication status
    mobileUsers: []      // Array to store all mobile users
};

// API endpoint configuration
const API_BASE_URL = 'http://localhost:1726';

/**
 * Async thunk for mobile sign-in/sign-up
 * Handles both new user registration and existing user login via mobile
 */
export const mobileSignIn = createAsyncThunk(
    'auth/mobileSignIn',
    async (mobileData, { rejectWithValue }) => {

        try {
            // Validate mobile number format
            const mobileNumber = mobileData.mobile.toString().trim();
            if (!mobileNumber || mobileNumber.length !== 10) {
                throw new Error('Invalid mobile number format');
            }

            // API call to store mobile number
            const response = await fetch(`${API_BASE_URL}/Mobile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: mobileNumber,
                    timestamp: new Date().toISOString(), // Add timestamp for tracking
                    deviceInfo: {
                        userAgent: navigator.userAgent,
                        platform: navigator.platform
                    }
                })
            });

            // Handle API response
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Mobile sign in failed');
            }

            // Parse successful response
            const data = await response.json();

            // Log success for debugging
            console.log("Mobile signup successful:", data);

            // Return user data with additional mobile-specific info
            return {
                ...data,
                mobile: mobileNumber,
                loginTime: new Date().toISOString()
            };

        } catch (error) {
            console.error("Mobile signup error:", error);
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Redux slice for authentication state management
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Clear error state
        clearError: (state) => {
            state.error = null;
        },

        // Handle user logout
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            // Preserve mobileUsers array for history
        },

        // Update mobile users list
        updateMobileUsers: (state, action) => {
            // Ensure no duplicate mobile numbers
            const newUsers = action.payload.filter(newUser =>
                !state.mobileUsers.some(existingUser =>
                    existingUser.mobile === newUser.mobile
                )
            );
            state.mobileUsers = [...state.mobileUsers, ...newUsers];
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle API call initiation
            .addCase(mobileSignIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // Handle successful mobile sign-in
            .addCase(mobileSignIn.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;

                // Add new user to mobileUsers if not exists
                const existingUserIndex = state.mobileUsers.findIndex(
                    user => user.mobile === action.payload.mobile
                );

                if (existingUserIndex === -1) {
                    // Add new user
                    state.mobileUsers.push(action.payload);
                } else {
                    // Update existing user's data
                    state.mobileUsers[existingUserIndex] = {
                        ...state.mobileUsers[existingUserIndex],
                        ...action.payload,
                        lastLogin: new Date().toISOString()
                    };
                }
            })

            // Handle sign-in failure
            .addCase(mobileSignIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            });
    }
});

// Export actions and reducer
export const { clearError, logout, updateMobileUsers } = authSlice.actions;
export default authSlice.reducer;