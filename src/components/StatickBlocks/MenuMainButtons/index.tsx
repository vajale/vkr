import React from "react";

import ButtonWithIcon from "../../common/ButtonWithIcon";

import { StyledMainButtons } from "./styled";
import AuthProfilePopover from "@/components/AuthProfilePopover";
import Login from "@/components/Login";
import { useFirebaseAuth } from "@/components/FireBase";

const MenuMainButtons: React.FC = () => {
    const { isAuth } = useFirebaseAuth();

    return (
        <StyledMainButtons>
            {isAuth ? <AuthProfilePopover/> : <Login/>}
        </StyledMainButtons>
    );
};

export default MenuMainButtons;
