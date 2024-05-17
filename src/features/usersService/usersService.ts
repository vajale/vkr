import { firebaseApi } from "@/api";
import { mockUsersData } from "@/utils/mock/mockdata";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseAuth, firestoreDB } from "@/components/FireBase";
import { type User } from "@/store/slices/userSlice/types";
import { type IRegisterForm } from "@/components/Login/RegisterForm/types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const usersService = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getActiveUsers: builder.query<User[], number>({
            queryFn: () => {
                return { data: mockUsersData };
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
        createUser: builder.mutation<User, { email: string, password: string, registerData: IRegisterForm }>({
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
        getUser: builder.query<User, { userId: string }>({
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
    }),
});

export const {
    useGetActiveUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useLoginMutation
} = usersService;
