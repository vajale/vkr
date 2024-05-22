import { firebaseStorage } from "@/components/FireBase";
import { firebaseApi } from "@/api";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const firebaseUserDataAPI = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfileData: builder.query<string, { userId: string }>({
            // @ts-expect-error
            queryFn: async (_arg) => {
                const { userId } = _arg;

                const storageRef = ref(firebaseStorage, `users/${userId}/icon.png`);

                const downloadUrl = await getDownloadURL(storageRef);

                return { data: downloadUrl };
            },
        }),
        setUserProfileData: builder.mutation({
            queryFn: async ({ file, userId }: { file: File; userId: string }) => {
                const storageRef = ref(firebaseStorage, `users/${userId}/icon.png`);

                const result = await uploadBytes(storageRef, file);

                return { data: result, status: "success" };
            },
        }),
    }),
});

export const {
    useLazyGetUserProfileDataQuery,
    useGetUserProfileDataQuery,
    useSetUserProfileDataMutation,
} = firebaseUserDataAPI;
