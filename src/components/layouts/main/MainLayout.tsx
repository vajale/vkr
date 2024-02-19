import React from "react";

import { StyledMainLayout } from "./styled";
import { Menu } from "../../Menu";
import PageView from "../../PageView/ui/PageView/PageView";

export const MainLayout: React.FC = () => {
    return (
        <StyledMainLayout>
            <Menu>menu</Menu>
            <PageView />
        </StyledMainLayout>
    );
};
