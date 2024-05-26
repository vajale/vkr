import { firebaseStorage } from "@/components/FireBase";
import { firebaseApi } from "@/api";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const firebaseUserDataAPI = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDocumentImage: builder.query<string, { pageId?: string; imgId?: string }>({
            // @ts-expect-error
            queryFn: async (_arg) => {
                const { pageId, imgId } = _arg;

                const storageRef = ref(firebaseStorage, `page/${pageId}/${imgId}.png`);

                const downloadUrl = await getDownloadURL(storageRef);

                return { data: downloadUrl };
            },
        }),
        setDocumentImage: builder.mutation({
            queryFn: async ({
                file,
                pageId,
                imgId,
            }: {
                file: File;
                pageId?: string;
                imgId?: string;
            }) => {
                const storageRef = ref(firebaseStorage, `page/${pageId}/${imgId}.png`);

                const result = await uploadBytes(storageRef, file);

                return { data: result, status: "success" };
            },
        }),
    }),
});

export const {
    useGetDocumentImageQuery,
    useLazyGetDocumentImageQuery,
    useSetDocumentImageMutation,
} = firebaseUserDataAPI;
