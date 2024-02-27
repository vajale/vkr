import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type DocumentBlock } from "../types";

export const documentsApi = createApi({
    reducerPath: 'documentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getDocuments: builder.query<DocumentBlock[], string>({
            query: (name) => `mockApi/${name}`
        })
    })
});

export const { useGetDocumentsQuery } = documentsApi;
