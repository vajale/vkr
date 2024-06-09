import { StyledPageView } from "@/components/PageView/ui/PageView/styled";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import React, { useState } from "react";
import PageHeader from "@/components/PageView/ui/PageHeader/PageHeader";
import { type Page } from "@/components/PageView/model/types";
import { pageActions } from "@/store/slices/pageSlice";
import { useAppDispatch } from "@/store/hooks";
import { mockDocs1 } from "@/utils/mock/mockdata";
import { useCreateNewPageMutation } from "@/api/firebasePageAPI/pagesEndpoins";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "@/constants/navigation";

const DefaultPage = () => {
    const dispatch = useAppDispatch();

    const [createNewPage] = useCreateNewPageMutation();
    const navigate = useNavigate();

    const handleCreateNewEmptyPage = () => {
        void createNewPage({}).then((data) => {
            const pageId = data.data.id;

            navigate(`${NAVIGATION.PAGE}${pageId}`, { replace: true });
        });
    };

    return (
        <StyledPageView>
                <Typography
                    variant={"h4"}
                    mb={7}
                    mt={7}
                    sx={{ ml: 11, fontWeight: 700, width: 400 }}>
                    Создать страницу
                </Typography>
                 <Stack ml={11} flexDirection={'column'} alignItems={'flex-start'} gap={2}>
                    <Button onClick={handleCreateNewEmptyPage}>
                        <MaterialIcon name={'MdPageview'}/>
                        <Typography ml={2}>
                            Пустая страница
                        </Typography>
                    </Button>
                    <Button onClick={handleCreateNewEmptyPage}>
                        <MaterialIcon name={'MdOutlineTask'}/>
                        <Typography ml={2}>
                            Список задач
                        </Typography>
                    </Button>
                 </Stack>
        </StyledPageView>
    );
};

export default DefaultPage;
