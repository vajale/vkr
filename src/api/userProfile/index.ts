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
            query: async ({ file, userId }: { file: File; userId: string }) => {
                const storageRef = ref(firebaseStorage, `users/${userId}/icon.png`);

                const result = await uploadBytes(storageRef, file);

                return Boolean(result);
            },
        }),
    }),
});

export const { useLazyGetUserProfileDataQuery, useSetUserProfileDataMutation } =
    firebaseUserDataAPI;
