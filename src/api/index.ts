import { type AppDispatch } from "@/store/store";
import { axiosInstance } from "@/utils/api/api";
import { type BaseQueryFn, createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type AxiosError, type AxiosRequestConfig } from "axios";

const baseUrl = "http://localhost:4000/";

interface CustomQueryArgs extends AxiosRequestConfig {
    onSuccess?: (dispatch: AppDispatch, data: unknown) => Promise<void>;
}

export type CustomBaseQueryType = BaseQueryFn<CustomQueryArgs, unknown, unknown>;

export const axiosBaseQuery: CustomBaseQueryType = async (
    { onSuccess, ...args },
    { dispatch },
    extraOptions,
) => {
    try {
        const result = await axiosInstance.request(args);

        if (onSuccess != null) {
            try {
                await onSuccess(dispatch, result.data);
            } catch (e) {
                console.error("Error in onSuccess method", e);
                throw e;
            }
        }

        return { data: result.data };
    } catch (error: unknown) {
        const err = error as AxiosError;

        if (err.response?.status === 401) {
            try {
                // some handling error
            } catch {}
        }

        return {
            error,
        };
    }
};

export const firebaseApi = createApi({
    reducerPath: "firebaseApi",
    baseQuery: fakeBaseQuery(),
    endpoints: () => ({}),
});
