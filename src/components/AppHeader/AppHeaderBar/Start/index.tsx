import React, {useEffect} from "react";

import Login from "../../../Login";
import {useFirebaseAuth} from "@/components/FireBase";

import AuthProfilePopover from "@/components/AuthProfilePopover";


export const AppHeaderStart: React.FunctionComponent = () => {
    const {isAuth, nigauser} = useFirebaseAuth()


    return (
        <div>
            {isAuth ? <AuthProfilePopover/> : <Login/>}
        </div>
    );
};

