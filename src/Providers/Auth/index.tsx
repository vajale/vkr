import React, { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectIsInitialized } from "@/store/slices/userSlice";
import { InitialRoute } from "@/routes/InitializingRoute";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isInitialized = useAppSelector(selectIsInitialized);

    return useMemo(() => {
        if (isInitialized) {
            return <div>{children}</div>;
        }
        return <InitialRoute />;
    }, [isInitialized]);
};
