import React, { type FC } from "react";
import { type ISecureRouteProps } from "@/routes/SecureRoute/types";
import { Navigate } from "react-router";

import Constants from "@/constants";
import { useFirebaseAuth } from "@/components/FireBase";

export const SecureRoute: FC<ISecureRouteProps> = ({ children }): JSX.Element => {
    const { isAuth } = useFirebaseAuth();

    if (!isAuth) {
        return <Navigate to={Constants.NAVIGATION.LANDING.MAIN} />;
    }

    return children;
};
