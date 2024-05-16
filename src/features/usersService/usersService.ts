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
        getUser: builder.query<User>({
            async queryFn() {
                // const userId = useAppSelector(selectUser);
                // console.log(userId);

                const blogRef = doc(firestoreDB, "users", "n8diMEUERjVuQti5qgvwYSDXYmg1");

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
                        id: "n8diMEUERjVuQti5qgvwYSDXYmg1",
                        pages: userData.pages,
                        username: userData.username,
                    },
                };
            },
        }),
        // addActiveUser: builder.mutation<User, Partial<User>>({
        //     queryFn: async (user) => {
        //         // try {
        //         //     await updateDoc(doc(firestoreDB, 'pages', userId, 'pages', id), {
        //         //         documentBlocks: newPage.documentBlocks,
        //         //         parent: null
        //         //     });
        //         //     return { data: null };
        //         // } catch (error: any) {
        //         //     console.error(error.message);
        //         //     return { error: error.message };
        //         // }
        //     }
        // })
    }),
});

export const { useGetActiveUsersQuery, useGetUserQuery } = usersService;
