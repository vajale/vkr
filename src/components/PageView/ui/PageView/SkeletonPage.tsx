import { Paper, Skeleton, Stack } from "@mui/material";
import PageHeader from "@/components/PageView/ui/PageHeader/PageHeader";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import React from "react";

const SkeletonPage = () => {
    return (
        <StyledPageView>
            <Paper className={"page-view-paper"} sx={{ width: 1200, height: 800, borderRadius: 3, ml: 7 }}>
                <Stack gap={1}>
                    <Skeleton sx={{ width: "90%", height: 300, borderRadius: 3, ml: 7 }}/>
                </Stack>
            </Paper>
        </StyledPageView>
    );
};

export default SkeletonPage;
