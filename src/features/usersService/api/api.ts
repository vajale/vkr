import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const users = createApi({
    reducerPath: "usersApi",
    baseQuery: fakeBaseQuery(),
    endpoints: () => ({})
});
