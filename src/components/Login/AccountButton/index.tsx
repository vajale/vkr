import React from "react";

import { type IAccountButton } from "./types";

import { TITLES } from "@/components/Login/constants";

import { StyledAccountButton } from "./styled";
import { Typography } from "../../common/CustomTypography";

export const AccountButton: React.FC<IAccountButton> = ({ image, accountName, svgIcon, onClick }) => {
    const IconElement = () => {
        if (svgIcon) return svgIcon;
        return <img src={image} alt={TITLES.IMAGE_ALT}/>;
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        if (onClick != null) {
            onClick(e.target);
        }
    };

    return (
        <StyledAccountButton onClick={handleButtonClick}>
            <Typography>{accountName}</Typography>
            {IconElement()}
        </StyledAccountButton>
    );
};
