import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fakeBaseQuery(),
    endpoints: () => ({})
});
