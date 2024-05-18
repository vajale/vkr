import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import React, { useState } from "react";
import PageHeader from "@/components/PageView/ui/PageHeader/PageHeader";
import { type Page } from "@/components/PageView/model/types";
import { pageActions } from "@/store/slices/pageSlice";
import { useAppDispatch } from "@/store/hooks";
import { mockDocs1 } from "@/utils/mock/mockdata";

const DefaultPage = () => {
    const dispatch = useAppDispatch();

    // const handleCreateNewPageWithTasks = () => {
    //     dispatch(pageActions.updatePage({}));
    // };
    //
    // const handleCreateNewEmptyPage = () => {
    //     dispatch(pageActions.updatePage({
    //         documentBlocks: [mockDocs1[0]],
    //         visual: {
    //             name: 'Новая sss',
    //             background: ''
    //         }
    //     }));
    // };
    //
    // const handleHeaderChange = (content: string) => {
    //     dispatch(pageActions.updatePageHeader({ name: content }));
    // };

    return (
        <StyledPageView>
            <Paper className={"page-view-paper"} sx={{ width: 1200, height: 800, borderRadius: 3, ml: 7 }}>
                НЕТ ТАКОГО ЗАКОНА!
                {/* <PageHeader onContentChange={handleHeaderChange} text={'Новая страница'} background={''}/> */}
                {/* <Stack ml={11} flexDirection={'column'} alignItems={'flex-start'} gap={2}> */}
                {/*    <Button onClick={handleCreateNewEmptyPage}><MaterialIcon name={'MdPageview'}/><Typography ml={2}>Пустая */}
                {/*        страница</Typography></Button> */}
                {/*    <Button><MaterialIcon name={'MdOutlineTask'}/><Typography ml={2}>Список */}
                {/*        задач</Typography></Button> */}
                {/*    <Button><MaterialIcon name={'MdGrid3X3'}/><Typography ml={2}>Галерея</Typography></Button> */}
                {/*    <Button><MaterialIcon name={'MdCalendarToday'}/><Typography */}
                {/*        ml={2}>Календарь</Typography></Button> */}
                {/* </Stack> */}
            </Paper>
        </StyledPageView>
    );
};

export default DefaultPage;
