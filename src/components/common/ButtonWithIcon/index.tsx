import React from "react";

import { IButtonWithIcon } from "./types";

import { StyledButtonWithIcon } from "./styled";
import { Typography } from "@/components/common/CustomTypography";

const ButtonWithIcon: React.FunctionComponent<IButtonWithIcon> = ({ svg, title }) => {
    return (
        <StyledButtonWithIcon>
            {svg}
            <Typography>{title}</Typography>
        </StyledButtonWithIcon>
    );
};

export default ButtonWithIcon;
