import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import React from "react";
import PageHeader from "@/components/PageView/ui/PageHeader/PageHeader";

const DefaultPage = () => {
    return (
        <StyledPageView>
            <Paper className={"page-view-paper"} sx={{ width: 1200, height: 800, borderRadius: 3, ml: 7 }}>
                <PageHeader text={"Пустая страница"}/>
                <Stack ml={11} flexDirection={'column'} alignItems={'flex-start'} gap={2}>
                    <Button><MaterialIcon name={'MdPageview'}/><Typography ml={2}>Пустая
                        страница</Typography></Button>
                    <Button><MaterialIcon name={'MdOutlineTask'}/><Typography ml={2}>Список
                        задач</Typography></Button>
                    <Button><MaterialIcon name={'MdGrid3X3'}/><Typography ml={2}>Галерея</Typography></Button>
                    <Button><MaterialIcon name={'MdCalendarToday'}/><Typography
                        ml={2}>Календарь</Typography></Button>
                </Stack>
            </Paper>
        </StyledPageView>
    );
};

export default DefaultPage;
