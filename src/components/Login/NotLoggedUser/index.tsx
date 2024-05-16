import React from "react";

import { TITLES } from "../constants";

import { AccountButton } from "../AccountButton";

// @ts-expect-error
import NotLoggedSvg from "@/assets/svg/NotLoggedAvatar.svg";
import { LandingLogin } from "@/components/Login/LandingLogin";

interface Props {
    onClick: () => void;
    isLanding?: boolean;
}

export const NotLoggedUser: React.FC<Props> = ({ onClick, isLanding }) => {
    if (isLanding) {
        return <LandingLogin onClick={onClick} />;
    }

    return (
        <AccountButton
            image={NotLoggedSvg}
            onClick={() => {
                onClick();
            }}
            accountName={TITLES.LOG_IN}
        />
    );
};
