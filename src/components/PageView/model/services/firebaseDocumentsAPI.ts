import { firebaseAuth, firebaseDatabase, firebaseStorage, firestoreDB } from "@/components/FireBase";

import { type DocumentBlock, type Page } from "../types";
import { firebaseApi } from "@/api";
import { v4, v4 as uuidv4 } from 'uuid';
import { ref, set, get, child, update, push, remove } from "firebase/database";
import { doc, updateDoc, arrayUnion, deleteDoc, deleteField, getDoc } from "firebase/firestore";

function isPage (obj: any): obj is Page {
    return (
        obj !== undefined &&
        obj !== null &&
        typeof obj.id === "string" &&
        Array.isArray(obj.documentBlocks)
    );
}

interface PageResponse {
    page: Page,
    permissions: {
        creator: string,
        moder: string
    }
}

export function arrayToObject<T> (arr: DocumentBlock[] | undefined): Record<number, T> {
    const obj: Record<number, T> = {};
    arr.forEach((value, index) => {
        obj[index] = value;
    });
    return obj;
}

export const firebaseDocumentsAPI = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchPageData: builder.query<Page, { pageId: string }>({
            async queryFn ({ pageId }) {
                // const dispatch = useAppDispatch();

                if (pageId === "") {
                    return null;
                }

                const userId = firebaseAuth.currentUser?.uid;
                const dbRef = ref(firebaseDatabase);

                try {
                    const snapshot = await get(child(dbRef, pageId));

                    if (snapshot.exists()) {
                        const snapshotData = (snapshot.val() as PageResponse);
                        const permissions = snapshotData.permissions;

                        // if (permissions.creator === userId || permissions.moder === userId) {
                        //     return { data: snapshotData.page };
                        // }

                        const docBlocksArray = Object.values(snapshotData.page.documentBlocks);

                        return {
                            data: {
                                documentBlocks: docBlocksArray,
                                id: pageId,
                                parent: '',
                                visual: snapshotData.page.visual
                            }
                        };
                    } else {
                        console.log("No data available");
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        fetchPages: builder.query<Page[], string[]>({
            queryFn: async (pageIds) => {
                const dbRef = ref(firebaseDatabase);

                const promises = pageIds.map(async (pageId) => {
                    return await get(child(dbRef, pageId))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const response: PageResponse = (snapshot.val()) as PageResponse;
                                const { page, permissions } = response;

                                return {
                                    id: pageId,
                                    parent: '',
                                    visual: {
                                        name: page.visual?.name
                                    }
                                };
                            } else {
                                console.log("No data available");
                                return null;
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            return null;
                        });
                });

                const pagesResponses = await Promise.all(promises);
                const validResponses = pagesResponses.filter(response => response !== null);
                console.log(validResponses);

                return {
                    data: validResponses
                };
            },
        }),
        updatePageBlocks: builder.mutation<Page, { newPage: Page }>({
            queryFn: async ({ newPage }) => {
                const dbRef = ref(firebaseDatabase);
                const specificNodeRef = child(dbRef, newPage.id);
                const sp = child(specificNodeRef, 'page');

                try {
                    const updateData = {
                        documentBlocks: arrayToObject(newPage.documentBlocks)
                    };

                    await update(sp, updateData);

                    console.log('Данные успешно обновлены');
                    return newPage;
                } catch (error) {
                    console.error('Ошибка при обновлении данных:', error);
                    throw new Error('Ошибка при обновлении данных');
                }
            },
        }),
        updatePageVisual: builder.mutation<Page, { newPage: Page }>({
            queryFn: async ({ newPage }) => {
                const dbRef = ref(firebaseDatabase);
                const specificNodeRef = child(dbRef, newPage.id);
                const sp = child(specificNodeRef, 'page');

                try {
                    const updateData = {
                        visual: {
                            ...newPage.visual
                        }
                    };

                    await update(sp, updateData);

                    console.log('Данные успешно обновлены');
                    return newPage;
                } catch (error) {
                    console.error('Ошибка при обновлении данных:', error);
                    throw new Error('Ошибка при обновлении данных');
                }
            },
        }),
        createNewPage: builder.mutation<{ id: string }, _>({
            queryFn: async () => {
                const userId = firebaseAuth.currentUser?.uid;

                if (!userId) {
                    console.log('Пользователь не аутентифицирован');
                    return { error: 'Пользователь не аутентифицирован' };
                }

                try {
                    // Создаем ссылку на Realtime Database
                    const dbRef = ref(firebaseDatabase);

                    // Создаем объект для новой страницы в Realtime Database
                    const newPageObj = {
                        page: {
                            documentBlocks: {},
                            visual: {
                                name: 'Новая страница',
                                background: "whitesmoke"
                            }
                        },
                        permissions: {
                            creator: userId,
                            moder: ''
                        }
                    };

                    const key = await push(dbRef, newPageObj).then(data => data.key);

                    await updateDoc(doc(firestoreDB, 'users', userId), {
                        pages: arrayUnion(key)
                    });

                    console.log('Страница добавлена: ' + key);
                    return { id: key };
                } catch (error: any) {
                    console.error(error.message);
                    return { error: error.message };
                }
            }
        }),
        removePage: builder.mutation<Page, { pageId: string }>({
            queryFn: async ({ pageId }) => {
                const userId = firebaseAuth.currentUser?.uid;

                if (!userId) {
                    console.log('Пользователь не аутентифицирован');
                    return { error: 'Пользователь не аутентифицирован' };
                }

                const userDocRef = doc(firestoreDB, 'users', userId);
                const dbRef = ref(firebaseDatabase, pageId);

                try {
                    await remove(dbRef);

                    const userDocSnapshot = await getDoc(userDocRef);
                    if (!userDocSnapshot.exists()) {
                        console.log('Документ пользователя не найден');
                        return { error: 'Документ пользователя не найден' };
                    }

                    const currentPageIds = userDocSnapshot.data().pages || [];
                    const updatedPageIds = currentPageIds.filter(id => id !== pageId);

                    await updateDoc(userDocRef, { pages: updatedPageIds });

                    console.log('Страница удалена');
                    return null;
                } catch (error) {
                    console.error('Ошибка при удалении данных:', error);
                    throw new Error('Ошибка при удалении данных');
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

export const {
    useLazyFetchPagesQuery,
    useLazyUpdatePageRealtimeQuery,
    useCreateNewPageMutation,
    useFetchPageDataQuery,
    useUpdatePageVisualMutation,
    useUpdatePageBlocksMutation,
    useRemovePageMutation,
    useFetchPagesQuery
} =
    firebaseDocumentsAPI;
