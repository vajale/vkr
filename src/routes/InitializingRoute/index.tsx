import React, { useEffect } from "react";
import { StyledInitializingRoute } from "@/routes/InitializingRoute/styled";
import { useFirebaseAuth } from "@/components/FireBase";
import { useAppDispatch } from "@/store/hooks";
import { userActions } from "@/store/slices/userSlice";

export const InitialRoute = () => {
    const { authState } = useFirebaseAuth();
    const dispatch = useAppDispatch();
    const [user, isLoading] = authState;

    useEffect(() => {
        if (!isLoading) {
            dispatch(userActions.initializeUser());
        }
    }, [authState]);

    return <StyledInitializingRoute />;
};
