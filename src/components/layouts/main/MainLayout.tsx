import React, { useEffect } from "react";

import { StyledMainLayout, StyledContentWrapper } from "./styled";
import PageView from "../../PageView/ui/PageView/PageView";
import AppHeader from "../../AppHeader";

export const MainLayout: React.FC = () => {
    useEffect(() => {

    }, []);

    return (
        <StyledMainLayout>
            <AppHeader></AppHeader>
            <StyledContentWrapper>
                <PageView />
            </StyledContentWrapper>

        </StyledMainLayout>
    );
};
