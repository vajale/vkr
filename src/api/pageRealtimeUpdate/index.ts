import { child, onValue, ref } from "firebase/database";
import { firebaseRealtimeDatabase } from "@/components/FireBase";
import { firebaseApi } from "@/api";
import { type Page } from "@/components/PageView/model/types";
import { UserPermission } from "@/components/StatickBlocks/Members/PermissionSelect";

interface PageResponse {
    page: Page;
    permissions: unknown;
}

type PageRequestObjectType = PageResponse;

const api = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPageRealtimeData: builder.query<Page, { pageId: string }>({
            async queryFn ({ pageId }, { dispatch }) {
                const dbRef = ref(firebaseRealtimeDatabase);
                const specificNodeRef = child(dbRef, pageId);

                return await new Promise((resolve) => {
                    const unsubscribe = onValue(specificNodeRef, (snapshot) => {
                            if (snapshot.exists()) {
                                const snapshotData: PageResponse = snapshot.val();

                                const docBlocksArray = snapshotData?.page.documentBlocks
                                    ? Object.values(snapshotData?.page.documentBlocks)
                                    : [];

                                const pageData = {
                                    data: {
                                        documentBlocks: docBlocksArray,
                                        id: pageId,
                                        parent: "",
                                        visual: snapshotData.page.visual,
                                    } as Page,
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

                const dbRef = ref(firebaseRealtimeDatabase);
                const specificNodeRef = child(dbRef, pageId);

                const unsubscribe = onValue(specificNodeRef, (snapshot) => {
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
