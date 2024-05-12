import React from "react";
import { StyledLayoutHeader } from "./styled";
import Logo from "@/assets/svg/logo.svg";
import LandingRouteButtons from "@/components/buttons/landingRoute";
import { LoginButton } from "@/components/buttons/login";

const Header: React.FunctionComponent = () => {
    return (
        <StyledLayoutHeader>
            <div className={"title-wrapper"}>
                <img src={Logo} alt="logo" className={"logo"} />
            </div>
            <LandingRouteButtons />
            <LoginButton />
        </StyledLayoutHeader>
    );
};

export default Header;
