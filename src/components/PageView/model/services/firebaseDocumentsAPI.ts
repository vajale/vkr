import { firebaseAuth, firebaseDatabase, firestoreDB } from "@/components/FireBase";
import {
    type DocumentData,
    type DocumentSnapshot,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { DocumentBlockType, type Page } from "../types";
import { firebaseApi } from "@/components/PageView/model/api/api";
import { onValue, ref, set, get, child } from "firebase/database";

function isPage(obj: any): obj is Page {
    return (
        obj !== undefined &&
        obj !== null &&
        typeof obj.id === "string" &&
        Array.isArray(obj.documentBlocks)
    );
}

export const firebaseDocumentsAPI = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchPageData: builder.query<Page[], undefined>({
            // @ts-expect-error
            async queryFn() {
                const userId = firebaseAuth.currentUser?.uid;

                if (userId != null) {
                    const dbRef = ref(firebaseDatabase);
                    // const querySnapshot = await getDocs(blogRef);

                    get(child(dbRef, `${userId}`))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                console.log(snapshot.val());
                            } else {
                                console.log("No data available");
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }

                const queryData = querySnapshot.docs;

                const promises = queryData?.map(async (query) => {
                    const documentRef = doc(
                        firestoreDB,
                        "pages",
                        "2rLcXc4sd4WD97mu8o8jiyXRMxt1",
                        "pages",
                        query.id,
                    );
                    return await getDoc(documentRef)
                        .then((doc) => doc)
                        .catch((error) => {
                            console.log(error);
                        });
                });

                const pages = await Promise.all(promises);
                const pagesData = pages.map((data) => {
                    const documentData = data as DocumentSnapshot<DocumentData, DocumentData>;

                    return {
                        id: documentData.id,
                        // @ts-expect-error
                        documentBlocks: documentData.data().documentBlocks,
                        parent: null,
                    };
                });

                return { data: pagesData };
            },
        }),
        updatePage: builder.mutation<Page, { id: string; userId: string; newPage: Page }>({
            // @ts-expect-error
            queryFn: async ({ userId, id, newPage }) => {
                try {
                    await updateDoc(doc(firestoreDB, "pages", userId, "pages", id), {
                        documentBlocks: newPage.documentBlocks,
                        parent: null,
                    });
                    return { data: null };
                } catch (error: any) {
                    console.error(error.message);
                    return { error: error.message };
                }
            },
        }),
        updatePageRealtime: builder.query<string, { page: Page }>({
            queryFn: async (_arg) => {
                const { page } = _arg;
                const currentUserId = firebaseAuth.currentUser?.uid;

                const addData = async () => {
                    if (currentUserId != null) {
                        const reference = ref(firebaseDatabase, `/${currentUserId}/` + page.id);
                        await set(reference, page);
                    }

                    throw new Error("not logged");
                };

                try {
                    await addData();
                } catch (error) {
                    return "error";
                }
            },
        }),
    }),
});

export const { useFetchPageDataQuery, useUpdatePageMutation, useLazyUpdatePageRealtimeQuery } =
    firebaseDocumentsAPI;
