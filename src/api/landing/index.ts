import { firebaseStorage } from "@/components/FireBase";
import { firebaseApi } from "@/api";
import { getDownloadURL, ref } from "firebase/storage";

export const firebaseLandingAPI = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchLandingData: builder.query<string, { imageId }>({
            // @ts-expect-error
            queryFn: async (_arg) => {
                const { imageId } = _arg;
                const storageRef = ref(firebaseStorage, `landing/${imageId}`);

                const downloadUrl = await getDownloadURL(storageRef);

                return { data: downloadUrl };
            },
        }),
    }),
});

export const { useFetchLandingDataQuery } = firebaseLandingAPI;
