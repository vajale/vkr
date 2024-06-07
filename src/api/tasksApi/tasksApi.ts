import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const tasksApi = createApi({
    reducerPath: "tasksApi",
    baseQuery: fakeBaseQuery(),
    endpoints: () => ({}),
});
