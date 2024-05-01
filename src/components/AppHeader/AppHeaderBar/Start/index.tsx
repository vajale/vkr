import React, { useEffect } from "react";

import { Link, Stack, Typography } from "@mui/material";

export const AppHeaderStart: React.FunctionComponent = () => {
    return (
        <Stack flexDirection={'row'} alignItems={"center"}>
            <Stack ml={7} gap={7} flexDirection={'row'}>
                <Link underline={'none'} href={'/calendar'}>Календарь</Link>
                <Link underline={'none'} href={'/home'}>Задачи</Link>
            </Stack>
        </Stack>
    );
};
