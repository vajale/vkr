import { ref, onValue, child } from "firebase/database";
import { firebaseDatabase } from "@/components/FireBase";
import { firebaseApi } from "@/api";
import { type Page } from "@/components/PageView/model/types";

const api = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPageRealtimeData: builder.query<Page, { pageId: string }>({
            async queryFn ({ pageId }, { dispatch }) {
                const dbRef = ref(firebaseDatabase);
                const specificNodeRef = child(dbRef, pageId);
                const pageChild = child(specificNodeRef, "page");

                return await new Promise((resolve) => {
                    const unsubscribe = onValue(pageChild, (snapshot) => {
                            if (snapshot.exists()) {
                                resolve({ data: snapshot.val() });
                            } else {
                                resolve({ error: "Data not found" });
                            }
                        },
                        (error) => {
                            resolve({ error: error.message });
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

                const dbRef = ref(firebaseDatabase);
                const specificNodeRef = child(dbRef, pageId);
                const pageChild = child(specificNodeRef, "page");

                const unsubscribe = onValue(pageChild, (snapshot) => {
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

export const { useGetPageRealtimeDataQuery } = api;
