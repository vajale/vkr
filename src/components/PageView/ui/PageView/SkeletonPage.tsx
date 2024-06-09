import { Paper, Skeleton, Stack } from "@mui/material";
import PageHeader from "@/components/PageView/ui/PageHeader/PageHeader";
import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import React from "react";

const SkeletonPage = () => {
    return (
        <StyledPageView>
            <Skeleton sx={{ width: "100%", height: '100%', borderRadius: 3, ml: 1, opacity: 0.6 }}/>
        </StyledPageView>
    );
};

export default SkeletonPage;
