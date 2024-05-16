import React, { type FC } from "react";
import { type ISecureRouteProps } from "@/routes/SecureRoute/types";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/userSlice";
import { Navigate } from "react-router";

import Constants from "@/constants";

export const SecureRoute: FC<ISecureRouteProps> = ({ children }): JSX.Element => {
    const user = useAppSelector(selectUser);

    console.log("temp loggined");
    if (!true) {
        return <Navigate to={Constants.URL.UNAUTHORIZED} />;
    }

    return children;
};
