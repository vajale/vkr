import React from "react";

import { TITLES } from "../constants";

import { AccountButton } from "../AccountButton";

import { ReactComponent as NotLoggedSvg } from "../../../../src/assets/svg/NotLoggedAvatar.svg";

export const NotLoggedUser: React.FC = () => {
  return (
    <AccountButton svgIcon={<NotLoggedSvg />} accountName={TITLES.LOG_IN} />
  );
};
