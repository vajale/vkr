import { Button, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import PageLink from "@/components/PageLink/PageLink";
import {
    useCreateNewPageMutation,
    useFetchPagesQuery,
    useRemovePageMutation,
} from "@/api/firebasePageAPI/firebaseDocumentsAPI";
import { MaterialIcon } from "@/assets/Icon";
import { useAppSelector } from "@/store/hooks";
import { selectUserPages } from "@/store/slices/userSlice";
import Constants from "@/constants";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "@/constants/navigation";

interface ListProps {
    onPageChanged: () => void;
    pages: string[];
}

const PagesList = (props: ListProps) => {
    const { onPageChanged, pages } = props;
    const navigate = useNavigate();

    const {
        data: pagesData,
        isSuccess: pagesSuccess,
        isLoading: isPagesLoading,
    } = useFetchPagesQuery(pages);
    const [createPage, { isLoading: isLoadingCreatingNewPage, data: newPageId }] =
        useCreateNewPageMutation();
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

    const pagesRender = useMemo(() => {
        if (pages.length === 0) {
            return null;
        }

        if (isPagesLoading) {
            return (
                <div>
                    <Skeleton width={290} height={50} />
                    <Skeleton width={290} height={50} />
                    <Skeleton width={290} height={50} />
                </div>
            );
        }
        if (pagesSuccess && pagesSuccess) {
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
            <PageLink id={""} href={"/calendar"} label={"Поиск"} icon={"MdSearch"} />
            <Stack mt={4}>
                <PageLink id={""} href={"/calendar"} label={"Календарь"} icon={"MdCalendarToday"} />
                <PageLink id={""} href={"/calendar"} label={"Участники"} icon={"MdGroup"} />
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
