import React, { useMemo } from "react";

import { StyledMainLayout, StyledContentWrapper } from "./styled";
import AppHeader from "../../AppHeader";
import { useFetchPageDataQuery } from "@/components/PageView/model/services/firebaseDocumentsAPI";
import { Stack, Typography } from "@mui/material";

import PageView from "@/components/PageView/ui/PageView/PageView";
import PageLink from "@/components/PageLayout/PageLink";

export const MainLayout: React.FC = () => {
    const { data, isLoading, isError, isSuccess } = useFetchPageDataQuery({ userId: 'asdasd' });

    const pages = useMemo(() => {
        if (isSuccess) {
            return data.map(page => (
                <PageLink page={page} key={page.id} />
            ));
        }

        return null;
    }, [isError, isLoading]);

    return (
        <StyledMainLayout>
            <AppHeader></AppHeader>
            <StyledContentWrapper>
                <Stack padding={3} gap={1} style={{ width: 350, height: 900, background: "whitesmoke" }}>
                    <Typography>Страницы</Typography>
                    <Stack gap={1}>
                        {pages}
                    </Stack>
                </Stack>
                <PageView/>
            </StyledContentWrapper>
        </StyledMainLayout>
    );
};
