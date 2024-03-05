import React from "react";

import { StyledMainLayout } from "./styled";
import PageView from "../../PageView/ui/PageView/PageView";
import AppHeader from "../../AppHeader";

export const MainLayout: React.FC = () => {
    return (
        <StyledMainLayout>
            <AppHeader></AppHeader>
            <PageView />
        </StyledMainLayout>
    );
};
