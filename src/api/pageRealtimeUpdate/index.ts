import { ref, onValue } from "firebase/database";
import { firebaseDatabase } from "@/components/FireBase";
import { firebaseApi } from "@/api";
import { type Page } from "@/components/PageView/model/types";

const api = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPageRealtimeData: builder.query<Page, string>({
            async queryFn(arg, { dispatch }, extraOptions, baseQuery) {
                const dbRef = ref(firebaseDatabase, "-Ny6OtWpW-ozhOhJxp0F/page");
                console.log("arg", arg);
                return await new Promise((resolve) => {
                    const unsubscribe = onValue(
                        dbRef,
                        (snapshot) => {
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
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) => {
                await cacheDataLoaded;
                const dbRef = ref(firebaseDatabase, "-Ny6OtWpW-ozhOhJxp0F/page");
                console.log("arg", arg);
                const unsubscribe = onValue(dbRef, (snapshot) => {
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
