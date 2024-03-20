import React from "react";

import {IAccountButton} from "./types";

import {TITLES} from "@/components/Login/constants";

import {StyledAccountButton} from "./styled";
import {Typography} from "../../common/CustomTypography";

export const AccountButton: React.FC<IAccountButton> = ({image, accountName, svgIcon, onClick}) => {

    const IconElement = () => {
        if (svgIcon) return svgIcon;
        return <img src={image} alt={TITLES.IMAGE_ALT}/>;
    };

    const handleButtonClick = () => {
        if (onClick) {
            onClick()
        }
    };

    return (
        <StyledAccountButton onClick={handleButtonClick}>
            {IconElement()}
            <Typography>{accountName}</Typography>
        </StyledAccountButton>
    );
};
