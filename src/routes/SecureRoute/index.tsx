import React, { type FC } from "react";
import { type ISecureRouteProps } from "@/routes/SecureRoute/types";
import { Navigate } from "react-router";

import Constants from "@/constants";
import { useFirebaseAuth } from "@/components/FireBase";
import { useAppSelector } from "@/store/hooks";
import { selectIsInitialized } from "@/store/slices/userSlice";

export const SecureRoute: FC<ISecureRouteProps> = ({ children }): JSX.Element => {
    const { isAuth } = useFirebaseAuth();
    const isInitialized = useAppSelector(selectIsInitialized);

    if (!isAuth && isInitialized) {
        return <Navigate to={Constants.NAVIGATION.LANDING.MAIN} />;
    }

    return children;
};
