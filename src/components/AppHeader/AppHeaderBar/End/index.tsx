import React from "react";
import MenuMainButtons from "../../../StatickBlocks/MenuMainButtons";
import ColorModeButton from "@/components/buttons/ColorMode/index";
import {StyledHeaderEnd} from "./styled";

export const AppHeaderEnd: React.FunctionComponent = () => {
    return (
        <StyledHeaderEnd>
            <MenuMainButtons/>
            <ColorModeButton></ColorModeButton>
        </StyledHeaderEnd>
    );
};
