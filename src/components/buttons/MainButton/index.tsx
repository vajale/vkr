import { StyledMainButton } from "@/components/buttons/MainButton/styled";
import { MaterialIcon } from "@/assets/Icon";
import React from "react";
import { Typography } from "@/components/common/CustomTypography";
import { matchPath, useLocation } from "react-router-dom";
import { NAVIGATION } from "@/constants/navigation";

export const MainButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const location = useLocation();

    const isPage = matchPath({ path: NAVIGATION.PAGE, end: false }, location.pathname);

    if (!isPage) {
        return null;
    }

    return (
        <StyledMainButton onClick={onClick}>
            <MaterialIcon name={"MdGroup"} />
            <Typography>Участники</Typography>
        </StyledMainButton>
    );
};
