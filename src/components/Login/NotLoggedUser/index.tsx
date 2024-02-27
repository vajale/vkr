import React from "react";

import { TITLES } from "../constants";

import { AccountButton } from "../AccountButton";

import NotLoggedSvg from "@/assets/svg/NotLoggedAvatar.svg";

export const NotLoggedUser: React.FC = () => {
    return <AccountButton image={NotLoggedSvg} accountName={TITLES.LOG_IN} />;
};
