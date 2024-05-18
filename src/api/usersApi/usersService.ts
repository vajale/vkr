import { firebaseApi } from "@/api";
import { mockUsersData } from "@/utils/mock/mockdata";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseAuth, firebaseDatabase, firestoreDB } from "@/components/FireBase";
import { type User } from "@/store/slices/userSlice/types";
import { type IRegisterForm } from "@/components/Login/RegisterForm/types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import type { Page } from "@/components/PageView/model/types";
import { child, get, onValue, ref, remove, update } from "firebase/database";

interface UserFirebaseRequest {
    user: {
        firstName: string,
        lastname: string,
        email: string,
        phoneNumber: string
    },
    pages?: string[]
}

async function getUser (id: string): Promise<User> {
    try {
        const userDocRef = doc(firestoreDB, "users", id);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            console.log("No such user!");
            return { id, username: "", pages: [], error: "No such user" };
        }

        const userRequest = userDoc.data() as UserFirebaseRequest;

        return {
            id,
            username: `${userRequest.user.lastname} ${userRequest.user.firstName}`,
            pages: userRequest.pages,
        };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { id, username: "", pages: [], error: "Error fetching user data" };
    }
}

export const usersService = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getActiveUsers: builder.query<User[], { pageId: string }>({
            queryFn: async ({ pageId }) => {
                const userId = firebaseAuth.currentUser?.uid;

                if (!userId) {
                    console.log("Пользователь не аутентифицирован");
                    return { error: "Пользователь не аутентифицирован" };
                }

                try {
                    const pageRef = ref(firebaseDatabase, pageId);
                    const activeUsersChild = child(pageRef, 'activeUsers');

                    const usersSnapshot = await get(activeUsersChild);

                    if (usersSnapshot.exists()) {
                        const snapshotData = usersSnapshot.val();
                        const userIds = Object.values(snapshotData);

                        const usersData = await Promise.all(userIds.map(async id => await getUser(id)));

                        return {
                            data: usersData,
                        };
                    } else {
                        console.log("No data available");
                    }

                    return await getUser(userId);
                } catch (error) {
                    console.error("Ошибка при обновлении данных:", error);
                    throw new Error("Ошибка при обновлении данных");
                }
            },
        }),
        login: builder.mutation<User, { email: string, password: string }>({
            queryFn: async ({ email, password }) => {
                try {
                    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
                    const user = userCredential.user;

                    console.log("Вход выполнен");

                    return {
                        id: user.uid,
                        username: user.email,
                    };
                } catch (error: any) {
                    console.error("Не удалось войти");
                    return error.message;
                }
            }
        }),
        register: builder.mutation<User, { email: string, password: string, registerData: IRegisterForm }>({
            queryFn: async ({ email, password, registerData }) => {
                try {
                    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
                    const user = userCredential.user;
                    const userId = user.uid;

                    const userDocRef = doc(firestoreDB, 'users', userId);
                    const userData = {
                        user: {
                            firstName: registerData.firstName,
                            lastName: registerData.lastName,
                            email: user.email,
                            phoneNumber: registerData.phone
                        },
                        pages: []
                    };

                    await setDoc(userDocRef, userData);

                    console.log("регистрация выполнена");

                    return { data: userId };
                } catch (error) {
                    return { error: { message: error.message } };
                }
            }
        }),
        getUserById: builder.query<User, { userId: string }>({
            queryFn: async (_arg) => {
                const { userId } = _arg;

                const blogRef = doc(firestoreDB, "users", userId);

                const queryData = await getDoc(blogRef)
                    .then((doc) => {
                        return doc;
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                // @ts-expect-error
                const userData = queryData.data() as User;

                return {
                    data: {
                        id: userId,
                        pages: userData.pages,
                        username: userData.username,
                    },
                };
            },
        }),
        setUserActivity: builder.mutation<User, { pageId: string }>({
                queryFn: async ({ pageId }) => {
                    const userId = firebaseAuth.currentUser?.uid;

                    if (!userId) {
                        console.log("Пользователь не аутентифицирован");
                        return { error: "Пользователь не аутентифицирован" };
                    }

                    const dbRef = ref(firebaseDatabase);
                    const specificNodeRef = child(dbRef, pageId);

                    try {
                        const updateData = {
                            activeUsers: {
                                id: userId
                            }
                        };

                        await update(specificNodeRef, updateData);

                        console.log("Активный пользователь добавлен");
                        return userId;
                    } catch (error) {
                        console.error("Ошибка при обновлении данных:", error);
                        throw new Error("Ошибка при обновлении данных");
                    }
                },
            }
        ),
        removeUserActivity: builder.mutation<User, { pageId: string }>({
                queryFn: async ({ pageId }) => {
                    const userId = firebaseAuth.currentUser?.uid;

                    if (!userId) {
                        console.log("Пользователь не аутентифицирован");
                        return { error: "Пользователь не аутентифицирован" };
                    }

                    try {
                        const dbRef = ref(firebaseDatabase, pageId);
                        const usersChild = child(dbRef, 'activeUsers');

                        await remove(usersChild);
                        console.log("Активный пользователь убран");
                        return userId;
                    } catch (error) {
                        console.error("Ошибка при обновлении данных:", error);
                        throw new Error("Ошибка при обновлении данных");
                    }
                },
            }
        ),
        getActiveUsersSubscribe: builder.query<string[], { pageId: string }>({
            async queryFn ({ pageId }, { dispatch }) {
                const dbRef = ref(firebaseDatabase, pageId);
                const usersChild = child(dbRef, 'activeUsers');

                return await new Promise<User[]>((resolve, reject) => {
                    const unsubscribe = onValue(
                        usersChild,
                        async (usersSnapshot) => {
                            if (usersSnapshot.exists()) {
                                try {
                                    const snapshotData = usersSnapshot.val();
                                    const userIds = snapshotData != undefined ? Object.values(snapshotData) : [];
                                    // const promises = userIds.map(async (id: string) => await getUser(id));
                                    // const usersData: User[] = await Promise.all(promises);
                                    resolve(userIds);
                                } catch (error) {
                                    reject(new Error(`Error processing user data: ${error.message}`));
                                }
                            } else {
                                reject(new Error("Active users not found"));
                            }
                        },
                        (error) => {
                            reject(new Error(`Firebase error: ${error.message}`));
                        }
                    );

                    // Cleanup subscription on unmount
                    return () => {
                        unsubscribe();
                    };
                });
            },
            // Add subscription options
            onCacheEntryAdded: async (
                { pageId },
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) => {
                await cacheDataLoaded;

                const dbRef = ref(firebaseDatabase, pageId);
                const usersChild = child(dbRef, 'activeUsers');

                const unsubscribe = onValue(usersChild, (snapshot) => {
                    if (snapshot.exists()) {
                        updateCachedData((draft) => {
                            return snapshot.val();
                        });
                    }
                });

                await cacheEntryRemoved;
                unsubscribe();
            },
        }),
    }),
});

export const {
    useGetActiveUsersQuery,
    useRegisterMutation,
    useLoginMutation,
    useSetUserActivityMutation,
    useRemoveUserActivityMutation,
    useLazyGetActiveUsersSubscribeQuery,
    useGetUserByIdQuery
} = usersService;
