import React from "react";
import {Stack} from "@mui/material";
import AdditionalLinks from "@/components/AppHeader/AdditionalLinks";

const BottomBar: React.FunctionComponent = () => {
    return <Stack direction="row" alignItems="center" justifyContent="space-between">
        <AdditionalLinks/>
        <AdditionalLinks/>
    </Stack>
}

export default BottomBar;
