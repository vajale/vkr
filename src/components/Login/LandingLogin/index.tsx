import React from "react";
import { StyledLandingLogin } from "./styled";

export const LandingLogin = ({ onClick }: { onClick: () => void }) => {
    return <StyledLandingLogin onClick={onClick}>Войти</StyledLandingLogin>;
};
