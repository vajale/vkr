import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import React from "react";
import PageHeader from "@/components/PageView/ui/PageHeader/PageHeader";

const DefaultPage = () => {
    return (
        <StyledPageView>
            <PageHeader text={"Пустая страница"}/>
            <Paper className={"page-view-paper"}
                   sx={{
                       mt: 0,
                       width: 1300,
                       height: 1300,
                       p: 2
                   }}>
                <Stack flexDirection={'column'} alignItems={'flex-start'} gap={2}>
                    <Button><MaterialIcon name={'MdPageview'}/><Typography ml={2}>Пустая страница</Typography></Button>
                    <Button><MaterialIcon name={'MdOutlineTask'}/><Typography ml={2}>Список задач</Typography></Button>
                    <Button><MaterialIcon name={'MdGrid3X3'}/><Typography ml={2}>Галерея</Typography></Button>
                    <Button><MaterialIcon name={'MdCalendarToday'}/><Typography ml={2}>Календарь</Typography></Button>
                </Stack>
            </Paper>
        </StyledPageView>
    );
};

export default DefaultPage;
