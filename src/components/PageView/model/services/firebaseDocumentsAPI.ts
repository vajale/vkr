import { firestoreDB } from "@/components/FireBase";
import { type DocumentData, type DocumentSnapshot, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { DocumentBlockType, type Page } from "../types";
import { firebaseApi } from "@/components/PageView/model/api/api";

function isPage (obj: any): obj is Page {
    return (
        obj !== undefined &&
        obj !== null &&
        typeof obj.id === 'string' &&
        Array.isArray(obj.documentBlocks)
    );
}

export const firebaseDocumentsAPI = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchPageData: builder.query<Page[], { userId: string }>({
            // @ts-expect-error
            async queryFn ({ userId }) {
                const blogRef = collection(firestoreDB, "pages", '2rLcXc4sd4WD97mu8o8jiyXRMxt1', 'pages');
                const querySnapshot = await getDocs(blogRef);

                const queryData = querySnapshot.docs;

                const promises = queryData?.map(async (query) => {
                    const documentRef = doc(firestoreDB, 'pages', '2rLcXc4sd4WD97mu8o8jiyXRMxt1', 'pages', query.id);
                    return await getDoc(documentRef)
                        .then(doc => doc)
                        .catch(error => { console.log(error); });
                });

                const pages = await Promise.all(promises);
                const pagesData = pages.map((data) => {
                    const documentData = data as DocumentSnapshot<DocumentData, DocumentData>;

                    return {
                        id: documentData.id,
                        // @ts-expect-error
                        documentBlocks: documentData.data().documentBlocks,
                        parent: null
                    };
                });

                return { data: pagesData };
            }
        }),
        updatePage: builder.mutation<Page, { id: string, userId: string, newPage: Page }>({
            // @ts-expect-error
            queryFn: async ({ userId, id, newPage }) => {
                try {
                    await updateDoc(doc(firestoreDB, 'pages', userId, 'pages', id), {
                        documentBlocks: newPage.documentBlocks,
                        parent: null
                    });
                    return { data: null };
                } catch (error: any) {
                    console.error(error.message);
                    return { error: error.message };
                }
            }
        })
    })
});

export const { useFetchPageDataQuery, useUpdatePageMutation } = firebaseDocumentsAPI;
