import { combineReducers } from "@reduxjs/toolkit";
import SignInSlice from "../Slice/SignIn.slice";

export const rootReducer = combineReducers({

    signIn: SignInSlice,
});