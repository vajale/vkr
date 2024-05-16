import React from "react";
import { StyledLayoutHeader } from "./styled";
import Logo from "@/assets/svg/logo.svg";
import LandingRouteButtons from "@/components/buttons/landingRoute";
import Login from "@/components/Login";
import { useFirebaseAuth } from "@/components/FireBase";
import { StyledMainButtons } from "@/components/StatickBlocks/MenuMainButtons/styled";
import AuthProfilePopover from "@/components/AuthProfilePopover";

const Header: React.FunctionComponent = () => {
    const { isAuth } = useFirebaseAuth();

    return (
        <StyledLayoutHeader>
            <div className={"title-wrapper"}>
                <img src={Logo} alt="logo" className={"logo"} />
            </div>
            <LandingRouteButtons />
            <StyledMainButtons>{isAuth ? <AuthProfilePopover /> : <Login />}</StyledMainButtons>
        </StyledLayoutHeader>
    );
};

export default Header;
