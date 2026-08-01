import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "../../../api/axios_instance"
import { profile_end, signIn_end, signUp_end } from "../../../api/api_urls";
import { type ProfileRes, type Profile } from "../../utils/interfaces/response/profile_interface";
import { type SignUpResponse } from "../../utils/interfaces/response/signupResponse";
import { type SignInResponse } from "../../utils/interfaces/response/signinResponse";

interface AuthState {
    loading: boolean,
    user: Profile | null
}

const initialState : AuthState = {
    loading: false,
    user: null,
}

export const signupUser = createAsyncThunk<SignUpResponse, FormData>(
    "auth/signupUser",
    async (form_data: FormData) => {
        const response = await axiosInstance.post<SignUpResponse>(signUp_end, form_data);
        // console.log("API Response :", response);
        return response?.data;
    }
);

export const signinUser = createAsyncThunk<SignInResponse, FormData>(
    "auth/signinUser",
    async(form_data: FormData) => {
        const response = await axiosInstance.post(signIn_end, form_data);
        // console.log("API Response :", response);
        return response?.data;
    }
)

export const userProfile = createAsyncThunk<ProfileRes>(
    "auth/userProfile",
    async() => {
        const response = await axiosInstance.get<ProfileRes>(profile_end);
        // console.log("API Response :", response);
        return response?.data;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // signup
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signupUser.fulfilled, (state) => {
            // console.log("fulfilled action : ",action);
            state.loading = false;
        });
        builder.addCase(signupUser.rejected, (state) => {
            // console.log("rejected action", action);
            state.loading = false;
        });

        //signin
        builder.addCase(signinUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signinUser.fulfilled, (state) => {
            // console.log("fulfilled action : ",action);
            state.loading = false;
        });
        builder.addCase(signinUser.rejected, (state) => {
            // console.log("rejected action", action);
            state.loading = false;
        });

        //profile
        builder.addCase(userProfile.pending, (state) => {
            state.loading = true;
            state.user = null;
        });
        builder.addCase(userProfile.fulfilled, (state, action) => {
            // console.log("fulfilled action : ",action);
            state.loading = false;
            state.user = action.payload.data;
        });
        builder.addCase(userProfile.rejected, (state) => {
            // console.log("rejected action", action);
            state.loading = false;
            state.user  = null;
        });
    }
})

export default authSlice.reducer;