import { Button, Link, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import PageLink from "@/components/PageLink/PageLink";
import {
    useCreateNewPageMutation,
    useFetchPagesQuery,
    useRemovePageMutation,
} from "@/api/firebasePageAPI/pagesService";
import { MaterialIcon } from "@/assets/Icon";
import { useAppSelector } from "@/store/hooks";
import { selectUserPages } from "@/store/slices/userSlice";
import Constants from "@/constants";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "@/constants/navigation";
import { Members } from "@/components/StatickBlocks/Members";
import { MainButton } from "@/components/buttons/MainButton";
import AppLink from "@/components/AppLink/AppLink";

interface ListProps {
    onPageChanged: () => void;
}

const PagesList = (props: ListProps) => {
    const { onPageChanged } = props;
    const navigate = useNavigate();

    const userPagesId = useAppSelector(selectUserPages);

    const { data: pagesData, isSuccess: pagesSuccess, isLoading: isPagesLoading } = useFetchPagesQuery(userPagesId);
    const [createPage, { isLoading: isLoadingCreatingNewPage, data: newPageId }] = useCreateNewPageMutation();
    const [removePage] = useRemovePageMutation({});

    useEffect(() => {
        if (!isLoadingCreatingNewPage && newPageId) {
            navigate(`${NAVIGATION.PAGE}${newPageId.id}`, { replace: true });
        }
    }, [newPageId, isLoadingCreatingNewPage]);

    const handleAddPageClick = () => {
        void createPage().then(() => {
            onPageChanged();
        });
    };

    const handlePageRemove = (pageId: string) => {
        void removePage({ pageId }).then(() => {
            onPageChanged();
        });
    };

    const handleMainButton = () => {
        navigate(Constants.URL.HOME);
    };

    if (!userPagesId) {
        return null;
    }

    const pagesRender = useMemo(() => {
        if (isPagesLoading) {
            return (
                <div>
                    <Skeleton width={290} height={50} />
                    <Skeleton width={290} height={50} />
                    <Skeleton width={290} height={50} />
                </div>
            );
        }
        if (pagesSuccess) {
            return pagesData?.map((page) => (
                <PageLink
                    showOptionsButton
                    href={page.id}
                    key={page.id}
                    label={page.visual?.name}
                    width={290}
                    onPageDelete={() => {
                        handlePageRemove(page.id);
                    }}
                    icon={"MdSummarize"}
                    id={page.id}
                />
            ));
        }
    }, [pagesData]);

    return (
        <>
            <Typography
                className={"main-button"}
                mb={4}
                variant={"h5"}
                fontWeight={900}
                onClick={handleMainButton}>
                СЕЙФ +
            </Typography>
            <PageLink id={""} href={"calendar"} label={"Поиск"} icon={"MdSearch"} />
            <Stack mt={4}>
                <AppLink icon={"MdCalendarMonth"} href={'/calendar'} label={'Календарь'}/>
                <Members />
            </Stack>
            <Stack
                mt={2}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}>
                <Typography>Страницы</Typography>
                <Button sx={{ minWidth: 20 }} onClick={handleAddPageClick}>
                    <MaterialIcon name={"MdAdd"} />
                </Button>
            </Stack>
            <Stack gap={1}>{pagesRender}</Stack>
        </>
    );
};

export default PagesList;
