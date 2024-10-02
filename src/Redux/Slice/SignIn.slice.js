import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: [],
    error: null,
};

// add data in http://localhost:1726/signup api
export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password }) => {
        try {
            const response = await fetch('http://localhost:1726/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);

            return data;
        } catch (error) {
            return ('An error occurred. Please try again.');
        }
    }
);


export const GetUser = createAsyncThunk(
    'auth/GetUser',
    async (value) => {
        try {
            const response = await fetch('http://localhost:1726/signup', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(),
            });

            const data = await response.json();
            console.log(data);
            return data;
            // const filteredData = data.find((user) => user.email === email && user.password === password);
            // return filteredData;

        } catch (error) {
            return ('An error occurred. Please try again.');
        }
    }
)


const signInSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(GetUser.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
    }
})

export default signInSlice.reducer