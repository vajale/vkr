import React from "react";

import { StyledLandingLayout } from "@/components/layouts/landing/styled";
import { type ILandingLayout } from "@/components/layouts/landing/types";
import Alarm from "@/assets/svg/Alarm.svg";

export const LandingLayout: React.FC<ILandingLayout> = ({ children }) => {
    return (
        <StyledLandingLayout>
            <img className={"layout-alarm"} src={Alarm} alt={""} />
            {children}
        </StyledLandingLayout>
    );
};
