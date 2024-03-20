// import { type Page } from "../types";
// import { mocDocumentsApi } from "@/components/PageView/model/api/api";
// import {documentPageActions, selectDocuments} from "@/store/slices/pageSlice";
//
//
// interface GetPageResponse {
//     page: Page
// }
//
// interface GetPageRequest {
//     id: string
// }
//
// const baseUrl = 'http://localhost:4000/';
//
// function isPage (obj: any): obj is Page {
//     return (
//         obj !== undefined &&
//         obj !== null &&
//         typeof obj.id === 'string' &&
//         Array.isArray(obj.documentBlocks)
//     );
// }
//
// export const documentsApi = mocDocumentsApi.injectEndpoints({
//     endpoints: (builder) => ({
//         getPageById: builder.query<GetPageResponse, GetPageRequest>({
//             query: (req) => ({
//                 url: baseUrl + `pages/${req.id}`,
//                 method: 'GET',
//                 onSuccess: async (dispatch, data) => {
//                     const resData = data;
//
//                     if (!isPage(resData)) throw new Error('Response types error');
//
//                     const pageObj: Page = {
//                         id: resData.id,
//                         parent: resData.parent,
//                         documentBlocks: resData.documentBlocks
//                     };
//
//                     dispatch(documentPageActions.setPage(pageObj));
//                 }
//             })
//         }),
//         updatePage: builder.mutation<Page, void>({
//             query: (body) => {
//                 // const {id, ...data} = body
//                 console.log('ИДИ НАХУЙ')
//
//                 return {
//                     url: baseUrl + `pages`,
//                     method: 'POST',
//                 }
//             },
//             // invalidatesTags: [{ type: 'pages', id: 'LIST' }]
//         })
//     })
// });
//
// // export const { useGetPageByIdQuery, useUpdatePageMutation } = documentsApi;
