import { firebaseApi } from "@/api";
import { mockUsersData } from "@/utils/mock/mockdata";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "@/components/FireBase";
import { type User } from "@/store/slices/userSlice/types";

export const usersService = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getActiveUsers: builder.query<User[], number>({
            queryFn: () => {
                return { data: mockUsersData };
            },
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

export const { useGetActiveUsersQuery, useGetUserQuery } = usersService;
