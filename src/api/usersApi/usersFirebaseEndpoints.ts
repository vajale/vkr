import { firebaseApi } from "@/api";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseAuth, firebaseRealtimeDatabase, firestoreDB } from "@/components/FireBase";
import { SIGN_STATS, type User, type UserFirebase } from "@/store/slices/userSlice/types";
import { type IRegisterForm } from "@/components/Login/RegisterForm/types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { child, get, onValue, ref, remove, update } from "firebase/database";
import { userActions } from "@/store/slices/userSlice";
import { dispatch } from "@/store/store";
import { type Task } from "@/components/PageView/model/types";

export interface UserFirebaseRequest {
    user: {
        firstName?: string;
        lastname?: string;
        email?: string;
        phoneNumber?: string;
    };
    username?: string;
    pages?: string[];
    favorites?: string[];
    tasks?: Task[]
}

async function getUser (userId: string): Promise<User> {
    const blogRef = doc(firestoreDB, "users", userId);

    const queryData = await getDoc(blogRef)
        .then((doc) => doc.data())
        .catch((error) => {
            console.log(error);
        });

    const userData: UserFirebaseRequest = queryData as UserFirebaseRequest;

    const customUsername = `${userData.user.firstName} ${userData.user.lastname === undefined && ""}`;
    const user: UserFirebase = {
        data: {
            email: userData.user.email,
            firstName: userData.user.firstName,
            lastname: userData.user.lastname,
            phoneNumber: userData.user.phoneNumber,
        },
        pages: userData.pages,
        username: customUsername,
    };

    return {
        data: user,
    };
}

export const usersFirebaseEndpoints = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<User, { email: string; password: string }>({
            queryFn: async ({ email, password }) => {
                try {
                    const userCredential = await signInWithEmailAndPassword(
                        firebaseAuth,
                        email,
                        password,
                    );
                    const user = userCredential.user;

                    console.log("Вход выполнен");

                    dispatch(userActions.setSignStatus(SIGN_STATS.success));

                    return {
                        id: user.uid,
                        username: user.email,
                    };
                } catch (error: any) {
                    dispatch(userActions.setSignStatus(SIGN_STATS.error));

                    console.error("Не удалось войти");
                    return error.message;
                }
            },
        }),
        register: builder.mutation<
            User,
            { email: string; password: string; registerData: IRegisterForm }
        >({
            queryFn: async ({ email, password, registerData }) => {
                try {
                    const userCredential = await createUserWithEmailAndPassword(
                        firebaseAuth,
                        email,
                        password,
                    );
                    const user = userCredential.user;
                    const userId = user.uid;

                    const userDocRef = doc(firestoreDB, "users", userId);
                    const userData = {
                        user: {
                            firstName: registerData.firstName,
                            lastname: registerData.lastname,
                            email: user.email,
                            phoneNumber: registerData.phone,
                        },
                        pages: [],
                    };

                    await setDoc(userDocRef, userData);

                    console.log("регистрация выполнена");

                    dispatch(userActions.setSignStatus(SIGN_STATS.success));

                    return { data: userId };
                } catch (error) {
                    dispatch(userActions.setSignStatus(SIGN_STATS.error));
                    return { error: { message: error.message } };
                }
            },
        }),
        getUserById: builder.query<UserFirebase, { userId: string }>({
            queryFn: async (_arg) => {
                const { userId } = _arg;

                const userIdRef = doc(firestoreDB, "users", userId);

                const queryData = await getDoc(userIdRef)
                    .then((doc) => doc.data())
                    .catch((error) => {
                        console.log(error);
                    });

                const userFirebaseRequest: UserFirebaseRequest = queryData as UserFirebaseRequest;

                const customUsername = `${userFirebaseRequest.user.firstName} ${userFirebaseRequest.user.lastname === undefined && ""}`;

                // const pageMap = new Set(userFirebaseRequest.pages);
                // console.log(Array.from(new Set(userFirebaseRequest.pages)));

                const user: UserFirebase = {
                    data: {
                        email: userFirebaseRequest.user.email,
                        firstName: userFirebaseRequest.user.firstName,
                        lastname: userFirebaseRequest.user.lastname,
                        phoneNumber: userFirebaseRequest.user.phoneNumber,
                    },
                    pages: userFirebaseRequest.pages,
                    favorites: userFirebaseRequest.favorites,
                    username: customUsername,
                };

                return {
                    data: user,
                };
            },
        }),
        getActiveUsers: builder.query<User[], { pageId: string }>({
            queryFn: async ({ pageId }) => {
                const userId = firebaseAuth.currentUser?.uid;

                if (!userId) {
                    console.log("Пользователь не аутентифицирован");
                    return { error: "Пользователь не аутентифицирован" };
                }

                try {
                    const pageRef = ref(firebaseRealtimeDatabase, pageId);
                    const activeUsersChild = child(pageRef, "activeUsers");

                    const usersSnapshot = await get(activeUsersChild);

                    if (usersSnapshot.exists()) {
                        const snapshotData = usersSnapshot.val();
                        const userIds = Object.values(snapshotData);

                        const usersData = await Promise.all(
                            userIds.map(async (id) => await getUser(id)),
                        );

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
        setUserActivity: builder.mutation<User, { pageId: string }>({
            queryFn: async ({ pageId }) => {
                const userId = firebaseAuth.currentUser?.uid;

                if (!userId) {
                    console.log("Пользователь не аутентифицирован");
                    return { error: "Пользователь не аутентифицирован" };
                }

                const dbRef = ref(firebaseRealtimeDatabase);
                const specificNodeRef = child(dbRef, pageId);

                try {
                    const updateData = {
                        activeUsers: {
                            id: userId,
                        },
                    };

                    await update(specificNodeRef, updateData);

                    console.log("Активный пользователь добавлен");
                    return userId;
                } catch (error) {
                    console.error("Ошибка при обновлении данных:", error);
                    throw new Error("Ошибка при обновлении данных");
                }
            },
        }),
        removeUserActivity: builder.mutation<User, { pageId: string }>({
            queryFn: async ({ pageId }) => {
                const userId = firebaseAuth.currentUser?.uid;

                if (!userId) {
                    console.log("Пользователь не аутентифицирован");
                    return { error: "Пользователь не аутентифицирован" };
                }

                try {
                    const dbRef = ref(firebaseRealtimeDatabase, pageId);
                    const usersChild = child(dbRef, "activeUsers");

                    await remove(usersChild);
                    console.log("Активный пользователь убран");
                    return userId;
                } catch (error) {
                    console.error("Ошибка при обновлении данных:", error);
                    throw new Error("Ошибка при обновлении данных");
                }
            },
        }),
        getActiveUsersSubscribe: builder.query<string[], { pageId: string }>({
            async queryFn ({ pageId }, { dispatch }) {
                const dbRef = ref(firebaseRealtimeDatabase, pageId);
                const usersChild = child(dbRef, "activeUsers");

                return await new Promise<User[]>((resolve, reject) => {
                    const unsubscribe = onValue(
                        usersChild,
                        async (usersSnapshot) => {
                            if (usersSnapshot.exists()) {
                                try {
                                    const snapshotData = usersSnapshot.val();
                                    const userIds =
                                        snapshotData != undefined
                                            ? Object.values(snapshotData)
                                            : [];
                                    // const promises = userIds.map(async (id: string) => await getUser(id));
                                    // const usersData: User[] = await Promise.all(promises);
                                    resolve(userIds);
                                } catch (error) {
                                    reject(
                                        new Error(`Error processing user data: ${error.message}`),
                                    );
                                }
                            } else {
                                reject(new Error("Active users not found"));
                            }
                        },
                        (error) => {
                            reject(new Error(`Firebase error: ${error.message}`));
                        },
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

                const dbRef = ref(firebaseRealtimeDatabase, pageId);
                const usersChild = child(dbRef, "activeUsers");

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
    useRegisterMutation,
    useLoginMutation,
    useSetUserActivityMutation,
    useRemoveUserActivityMutation,
    useLazyGetActiveUsersSubscribeQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
} = usersFirebaseEndpoints;
