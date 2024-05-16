import React, { useEffect } from "react";
import { useFirebaseAuth } from "@/components/FireBase";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuth } = useFirebaseAuth();

    useEffect(() => {
        console.log("Autorize process: ", isAuth);
    }, []);

    return <div>{children}</div>;
};
