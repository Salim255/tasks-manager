import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

import { getUserProfileHttp } from "../../profile/http/profileHttp";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import { getDemoClientId } from "../../../shared/utils/demo_client_id";
import type { AuthPayload, AuthResponseDto, AuthType } from "../dto/auth-dto";
import { handleHttpError } from "../../../shared/http/handleHttpError";


export const logoutHttp = createAsyncThunk<
    AuthResponseDto,
    {},
    { rejectValue: ApiErrorDto }
    >(
    "auth/logoutHttp",
    async (_, thunkApi) => {
        try {
            const response = await api.post(
                '/auth/logout',
                {},
                { withCredentials: true }
            );
            thunkApi.dispatch(getUserProfileHttp());
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
        }
    }
)

export const demoLoginHttp = createAsyncThunk<
    AuthResponseDto,
    { authType: AuthType },
    { rejectValue: ApiErrorDto }
    >(
    'demoLogin/demoLoginHttp',
    async (data: { authType: AuthType }, thunkApi) => {
        try {
            const demoClientId = getDemoClientId();
            const response = await api.post(
                `/auth/${data.authType}`,
                { demoClientId },
                { withCredentials: true }
            )
            thunkApi.dispatch(getUserProfileHttp());
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
        }
    }
)

export const authUserHttp = createAsyncThunk<
    AuthResponseDto,
    AuthPayload,
    { rejectValue: ApiErrorDto }
    >(
    'authUser/authUserHttp',
    async (data: AuthPayload, thunkApi) => {
        try {
            const response = await api.post(
                `/auth/${data.authType}`,
                { email: data.email, password: data.password },
                { withCredentials: true }
            )
            thunkApi.dispatch(getUserProfileHttp());
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
        }
    }
)

export const loadUserHttp = createAsyncThunk(
  'user/loadUserHttp',
  async (_, thunkApi) => {
    try {
      const res = await api.get('/users/me');
      await thunkApi.dispatch(getUserProfileHttp());
      return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(handleHttpError(error, thunkApi));
    }
  }
);

