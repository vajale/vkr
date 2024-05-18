import { StyledMainButton } from "@/components/buttons/MainButton/styled";
import { MaterialIcon } from "@/assets/Icon";
import React from "react";
import { Typography } from "@/components/common/CustomTypography";

export const MainButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <StyledMainButton onClick={onClick}>
            <MaterialIcon name={"MdGroup"} />
            <Typography>Участники</Typography>
        </StyledMainButton>
    );
};
