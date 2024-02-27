import React from "react";

import {StyledCommonBar} from "./styled";
import AppHeaderBar from "../AppHeaderBar/index";
import BottomBar from "@/components/AppHeader/BottomBar";

export const CommonBar: React.FC = () => {
    return (
        <StyledCommonBar>
            <AppHeaderBar/>
            <BottomBar/>
        </StyledCommonBar>
    );
};
