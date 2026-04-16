import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiErrorDto } from "../../../shared/interfaces/shared.interfaces";
import type { MemberRole } from "../forms-builders/memberFormBuilder";
import type { Member } from "../models/member.model";
import { AxiosError } from "axios";
import api from "../../../api/axios";

export type CreateMemberPayload = {
    projectId: string;
    email: string;
    role: MemberRole
}

export type CreateMemberResponseDto = {
    status: string;
    data: {
        member: Member
    }
}


export const addMemberHttp = createAsyncThunk<
    CreateMemberResponseDto,
    CreateMemberPayload,
    { rejectValue: ApiErrorDto }  // error type
    >(
    'post/createProjectMember',
    async (data: CreateMemberPayload, thunkApi) => {
        try {
            const response = await api.post(`/members`, data, {withCredentials: true});
            return response.data
        } catch (error) {
            // Extract your backend error shape
            if (error instanceof AxiosError) {
                    const backendError: ApiErrorDto = error.response?.data || {
                        status: "error",
                        message: "Unknown error",
                        data: null
                    };

                return thunkApi.rejectWithValue(backendError);
            }
            // fallback for non-Axios errors
            return thunkApi.rejectWithValue({
                status: "error",
                message: "Unexpected error",
                data: null
            });
        }
    }
)