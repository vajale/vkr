import React from "react";
import { StyledContentWrapper } from "./styled";

export const ContentWrapper: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    return <StyledContentWrapper>{children}</StyledContentWrapper>;
};
