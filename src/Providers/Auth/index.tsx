import React, { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/userSlice";
import { InitialRoute } from "@/routes/InitializingRoute";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const user = useAppSelector(selectUser);

    const isInitialized = useMemo(() => {
        return user !== "initial";
    }, [user]);

    return useMemo(() => {
        if (isInitialized) {
            return <div>{children}</div>;
        }
        return <InitialRoute />;
    }, [isInitialized]);
};
