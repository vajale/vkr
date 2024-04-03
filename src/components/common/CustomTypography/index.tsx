import React from "react";

import { ICustomTypography } from "./types";
import { StyledCustomTypography } from "./styled";

const Typography: React.FunctionComponent<ICustomTypography> = ({ children, className }) => {
    return <StyledCustomTypography className={className}>{children}</StyledCustomTypography>;
};

export { Typography };
