import { firebaseApi } from "@/components/PageView/model/api/api";
import { type User } from "@/utils/types";

export const usersService = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getActiveUsers: builder.query<User[], number>({
            queryFn: () => {
                return { data: [] };
            }
        }),
        addActiveUser: builder.mutation<User, Partial<User>>({
            queryFn: async (user) => {
                // try {
                //     await updateDoc(doc(firestoreDB, 'pages', userId, 'pages', id), {
                //         documentBlocks: newPage.documentBlocks,
                //         parent: null
                //     });
                //     return { data: null };
                // } catch (error: any) {
                //     console.error(error.message);
                //     return { error: error.message };
                // }
            }
        })
    })
});
