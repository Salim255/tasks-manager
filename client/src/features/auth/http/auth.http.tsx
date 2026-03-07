import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type AuthType = "login" | "register";
export type LoginPayload = { password: string; email: string, authType: AuthType };

const apiUrl = import.meta.env.VITE_API_URL;

export const authUser = createAsyncThunk(
    'post/authUser',
    async (data: LoginPayload, thunkAPI) => {
        try {
            const response = await axios.post(
                `${apiUrl}/auth/${data.authType}`,
                { email: data.email, password: data.password },
            )
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const refreshToken = createAsyncThunk(
    'auth/refresh-token',
    async (_, thunkApi) => {
        try {
            const res = await axios.get(`${apiUrl}/auth/refresh-token`);
            return res ;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)
