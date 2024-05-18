import { ref, onValue, child } from "firebase/database";
import { firebaseDatabase } from "@/components/FireBase";
import { firebaseApi } from "@/api";
import { type Page } from "@/components/PageView/model/types";

interface PageResponse {
    page: Page;
    permissions: {
        creator: string;
        moder: string;
    };
}

type PageRequestObjectType = PageResponse;

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
                                const snapshotData: Page = snapshot.val();
                                // const permissions = snapshotData.permissions;

                                // if (permissions.creator === userId || permissions.moder === userId) {
                                //     return { data: snapshotData.page };
                                // }

                                const docBlocksArray = snapshotData?.documentBlocks ? Object.values(snapshotData?.documentBlocks) : [];

                                const pageData = {
                                    data: {
                                        documentBlocks: docBlocksArray,
                                        id: pageId,
                                        parent: "",
                                        visual: snapshotData.visual,
                                    },
                                };

                                resolve(pageData);
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
