import React from "react";

import { TITLES } from "../constants";

import { AccountButton } from "../AccountButton";

// @ts-ignore
import NotLoggedSvg from "@/assets/svg/NotLoggedAvatar.svg";

interface Props {
    onClick: () => void
}

export const NotLoggedUser: React.FC<Props> = ({onClick}) => {
    return <AccountButton image={NotLoggedSvg} onClick={() => {onClick()}} accountName={TITLES.LOG_IN} />;
};
