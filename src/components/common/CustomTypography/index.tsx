import React from "react";

import { ICustomTypography } from "./types";
import { StyledCustomTypography } from "./styled";

const Typography: React.FunctionComponent<ICustomTypography> = ({ children }) => {
   return <StyledCustomTypography>{children}</StyledCustomTypography>;
};

export { Typography };
