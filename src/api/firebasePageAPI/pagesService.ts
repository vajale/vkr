import { firebaseAuth, firebaseRealtimeDatabase, firestoreDB } from "@/components/FireBase";

import { type DocumentBlock, type Page } from "../../components/PageView/model/types";
import { firebaseApi } from "@/api";
import { child, get, push, ref, remove, set, update } from "firebase/database";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { PermissionSelect, UserPermission } from "@/components/StatickBlocks/Members/PermissionSelect";
import { useAppSelector } from "@/store/hooks";
import { selectPageId } from "@/store/slices/pageSlice";

function isPage (obj: any): obj is Page {
    return (
        obj !== undefined &&
        obj !== null &&
        typeof obj.id === "string" &&
        Array.isArray(obj.documentBlocks)
    );
}

export interface PageResponse {
    page: Page;
    permissions: Record<string, UserPermission>;
}

export type PageRequestObjectType = PageResponse & {
    permissions: Record<string, UserPermission>
};

export type SimplyPage = Omit<Page, 'documentBlocks' | 'isFavorite'>;

export function arrayToObject<T> (arr: T[] | undefined): Record<number, T> {
    const obj: Record<number, T> = {};
    arr.forEach((value, index) => {
        obj[index] = value;
    });
    return obj;
}

interface PermissionsResult {
    readers: string[];
    creators: string[];
    moderators: string[];
}

// const userList = Object.keys(permissions).map(user => {
//     return {
//         creators: permissions[user] === UserPermission.CREATOR && user,
//         moderators: permissions[user] === UserPermission.MODERATOR && user,
//         readers: permissions[user] === UserPermission.READER && user,
//     };
// });
//
// console.log(userList);

export const pagesService = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchPageData: builder.query<Page, { pageId: string }>({
            async queryFn ({ pageId }) {
                // const dispatch = useAppDispatch();

                if (pageId === "") {
                    return null;
                }

                const dbRef = ref(firebaseRealtimeDatabase);

                try {
                    const snapshot = await get(child(dbRef, pageId));

                    if (snapshot.exists()) {
                        const snapshotData = snapshot.val() as PageResponse;
                        const permissions = snapshotData.permissions;

                        const docBlocksArray = Object.values(snapshotData.page.documentBlocks);

                        return {
                            data: {
                                documentBlocks: docBlocksArray,
                                id: pageId,
                                parent: snapshotData.page.parent,
                                child: snapshotData.page.child,
                                visual: snapshotData.page.visual,
                                permissions
                            },
                        };
                    } else {
                        console.log("No data available");
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        fetchPages: builder.query<SimplyPage[], string[]>({
            queryFn: async (pageIds) => {
                if (!Array.isArray(pageIds) || pageIds.length === 0) {
                    throw new Error("Invalid input: pageIds must be a non-empty array.");
                }

                const dbRef = ref(firebaseRealtimeDatabase);

                try {
                    const promises = pageIds.map(async (pageId) => {
                        try {
                            const snapshot = await get(child(dbRef, pageId));
                            if (snapshot.exists()) {
                                const response: PageResponse = snapshot.val() as PageResponse;
                                const { page } = response;

                                return {
                                    id: pageId,
                                    parent: "",
                                    visual: {
                                        name: page.visual?.name,
                                    },
                                    child: page.child,
                                    parent: page.parent
                                } satisfies SimplyPage;
                            } else {
                                console.log(`No data available for pageId: ${pageId}`);
                                return null;
                            }
                        } catch (error) {
                            console.error(`Error fetching data for pageId: ${pageId}`, error);
                            return null;
                        }
                    });

                    const pagesResponses = await Promise.all(promises);
                    const validResponses = pagesResponses.filter((response) => response !== null);

                    return {
                        data: validResponses,
                    };
                } catch (error: any) {
                    console.error("Error processing page data:", error.message);
                    return { error: error.message };
                }
            },
        }),
        updatePageBlocks: builder.mutation<Page, { newPage: Page }>({
            queryFn: async ({ newPage }) => {
                const dbRef = ref(firebaseRealtimeDatabase);
                const specificNodeRef = child(dbRef, newPage.id);
                const sp = child(specificNodeRef, "page");

                try {
                    const newData = arrayToObject(newPage.documentBlocks);

                    const updateData = {
                        documentBlocks: newData,
                    };

                    await update(sp, updateData);

                    console.log("Данные успешно обновлены");
                    return newPage;
                } catch (error) {
                    console.error("Ошибка при обновлении данных:", error);
                    throw new Error("Ошибка при обновлении данных");
                }
            },
        }),
        updatePageVisual: builder.mutation<Page, { newPage: Page }>({
            queryFn: async ({ newPage }) => {
                const dbRef = ref(firebaseRealtimeDatabase);
                const specificNodeRef = child(dbRef, newPage.id);
                const sp = child(specificNodeRef, "page");

                try {
                    const updateData = {
                        visual: {
                            ...newPage.visual,
                        },
                    };

                    await update(sp, updateData);

                    console.log("Данные успешно обновлены");
                    return newPage;
                } catch (error) {
                    console.error("Ошибка при обновлении данных:", error);
                    throw new Error("Ошибка при обновлении данных");
                }
            },
        }),
        addToFavorites: builder.mutation<{ id: string }, { pageId: string }>({
            queryFn: async ({ pageId }) => {
                const userId = firebaseAuth.currentUser?.uid;

                if (!userId) {
                    console.log("Пользователь не аутентифицирован");
                    return { error: "Пользователь не аутентифицирован" };
                }

                try {
                    await updateDoc(doc(firestoreDB, "users", userId), {
                        favorites: arrayUnion(pageId),
                    });

                    console.log("Страница добавлена в избранное: " + pageId);
                    return { data: { id: pageId } };
                } catch (error: any) {
                    console.error(error.message);
                    return { error: error.message };
                }
            },
        }),
        removeFavorites: builder.mutation<{ id: string }, { pageId: string }>({
            queryFn: async ({ pageId }) => {
                const userId = firebaseAuth.currentUser?.uid;

                if (!userId) {
                    console.log("Пользователь не аутентифицирован");
                    return { error: "Пользователь не аутентифицирован" };
                }

                try {
                    await updateDoc(doc(firestoreDB, "users", userId), {
                        favorites: arrayRemove(pageId),
                    });

                    console.log("Страница удалена из избранного: " + pageId);
                    return { data: { id: pageId } };
                } catch (error: any) {
                    console.error("Ошибка при обновлении данных:", error.message || error);
                    return { error: error.message };
                }
            },
        }),
        createNewPage: builder.mutation<{ id: string }, { parentId?: string }>({
            queryFn: async ({ parentId }) => {
                const userId = firebaseAuth.currentUser?.uid;

                if (!userId) {
                    console.log("Пользователь не аутентифицирован");
                    return { error: "Пользователь не аутентифицирован" };
                }

                try {
                    // Создаем ссылку на Realtime Database
                    const dbRef = ref(firebaseRealtimeDatabase);

                    // Создаем объект для новой страницы в Realtime Database
                    const newPageObj = {
                        page: {
                            documentBlocks: {
                                0: {
                                    id: new Date().toJSON(),
                                    content: '',
                                    type: 'TEXT'
                                }
                            },
                            visual: {
                                name: "Новая страница",
                                background: "whitesmoke",
                            },
                            id: ''
                        },
                        permissions: {
                            [userId]: UserPermission.CREATOR,
                        },
                    };

                    const pageFirebaseId = await push(dbRef, newPageObj).then((data) => data.key);

                    // добавление id в RealtimeBd
                    const newDbRef = ref(firebaseRealtimeDatabase, pageFirebaseId);
                    const ssss = child(newDbRef, 'page');
                    await update(ssss, { id: pageFirebaseId });

                    // обновление child в родителской странице

                    if (parentId) {
                        const parentRef = ref(firebaseRealtimeDatabase, parentId);
                        const parentPageRef = child(parentRef, 'page');
                        await update(parentPageRef, { child: pageFirebaseId });
                    }

                    // добавление id в database
                    await updateDoc(doc(firestoreDB, "users", userId), {
                        pages: arrayUnion(pageFirebaseId),
                    });

                    console.log("Страница добавлена: " + pageFirebaseId);
                    return { data: { id: pageFirebaseId } };
                } catch (error: any) {
                    console.error(error.message);
                    return { error: error.message };
                }
            },
        }),
        removePage: builder.mutation<Page, { pageId: string }>({
            queryFn: async ({ pageId }) => {
                const userId = firebaseAuth.currentUser?.uid;

                if (!userId) {
                    console.log("Пользователь не аутентифицирован");
                    return { error: "Пользователь не аутентифицирован" };
                }

                const userDocRef = doc(firestoreDB, "users", userId);
                const realtimeDataBaseRef = ref(firebaseRealtimeDatabase, pageId);

                try {
                    // const snapshot = await get(child(realtimeDataBaseRef, pageId));

                    // const snapshotData = snapshot.val() as PageResponse;
                    // const child = snapshotData.child;

                    await remove(realtimeDataBaseRef);

                    const userDocSnapshot = await getDoc(userDocRef);
                    if (!userDocSnapshot.exists()) {
                        console.log("Документ пользователя не найден");
                        return { error: "Документ пользователя не найден" };
                    }

                    const currentPageIds = userDocSnapshot.data().pages || [];
                    const updatedPageIds = currentPageIds.filter((id) => id !== pageId);

                    await updateDoc(userDocRef, { pages: updatedPageIds });

                    await updateDoc(doc(firestoreDB, "users", userId), {
                        favorites: arrayRemove(pageId),
                    });

                    console.log("Страница удалена");
                    return null;
                } catch (error) {
                    console.error("Ошибка при удалении данных:", error);
                    throw new Error("Ошибка при удалении данных");
                }
            },
        }),
        updatePageRealtime: builder.query<string, { page: Page }>({
            queryFn: async (_arg) => {
                const { page } = _arg;
                const currentUserId = firebaseAuth.currentUser?.uid;

                const addData = async () => {
                    if (currentUserId != null) {
                        const reference = ref(firebaseRealtimeDatabase, `/${currentUserId}/` + page.id);
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
        getUsersWithPermissions: builder.query<PermissionsResult, { pageId: string }>({
            queryFn: async ({ pageId }) => {
                const dbRef = ref(firebaseRealtimeDatabase);

                try {
                    const pageChild = child(dbRef, pageId);
                    const permissionChild = child(pageChild, 'permissions');
                    const snapshot = await get(permissionChild);

                    if (snapshot.exists()) {
                        const permissions = snapshot.val() as Record<string, UserPermission>;

                        const result = Object.keys(permissions).reduce((acc: PermissionsResult, user: string) => {
                            if (permissions[user] === UserPermission.READER) {
                                acc.readers.push(user);
                            }
                            if (permissions[user] === UserPermission.CREATOR) {
                                acc.creators.push(user);
                            }
                            if (permissions[user] === UserPermission.MODERATOR) {
                                acc.moderators.push(user);
                            }
                            return acc;
                        }, { readers: [], creators: [], moderators: [] });

                        return {
                            data: result
                        };
                    } else {
                        console.log("No data available");
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        updateUserPermission: builder.mutation<string, { pageId: string, userId: string, newPermission: UserPermission }>({
            queryFn: async ({ userId, newPermission, pageId }) => {
                const dbRef = ref(firebaseRealtimeDatabase);
                const pageRef = child(dbRef, pageId);
                const permissionsRef = child(pageRef, "permissions");

                try {
                    const updateData = {
                        [userId]: newPermission,
                    };

                    await update(permissionsRef, updateData);

                    console.log("Права успешно обновлены");
                    return newPermission;
                } catch (error) {
                    console.error("Ошибка при обновлении прав:", error);
                    throw new Error("Ошибка при обновлении прав");
                }
            },
        }),
    }),
});

export const {
    useLazyUpdatePageRealtimeQuery,
    useCreateNewPageMutation,
    useFetchPageDataQuery,
    useUpdatePageVisualMutation,
    useUpdatePageBlocksMutation,
    useRemovePageMutation,
    useFetchPagesQuery,
    useGetUsersWithPermissionsQuery,
    useUpdateUserPermissionMutation,
    useAddToFavoritesMutation,
    useRemoveFavoritesMutation
} = pagesService;
