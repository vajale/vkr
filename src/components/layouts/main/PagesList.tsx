import { Button, Divider, Link, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import PageLink from "@/components/PageLink/PageLink";
import {
    useCreateNewPageMutation,
    useFetchPagesQuery,
    useRemovePageMutation,
} from "@/api/firebasePageAPI/pagesService";
import { MaterialIcon } from "@/assets/Icon";
import { useAppSelector } from "@/store/hooks";
import { selectUserAuth, selectUserFavorites, selectUserPages } from "@/store/slices/userSlice";
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
    const userFavoritesId = useAppSelector(selectUserFavorites);
    const isAuth = useAppSelector(selectUserAuth);

    const { data: pagesData, isSuccess: pagesSuccess, isLoading: isPagesLoading } = useFetchPagesQuery(userPagesId);
    const { data: favoritesData, isSuccess: favoritesSuccess, isLoading: isFavoritesLoading } = useFetchPagesQuery(userFavoritesId);

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

    if (!isAuth) {
        return null;
    }

    if (isPagesLoading || isFavoritesLoading) {
        return (
            <div>
                <Skeleton width={290} height={50} />
                <Skeleton width={290} height={50} />
                <Skeleton width={290} height={50} />
            </div>
        );
    }

    // const pagesRender = useMemo(() => {
    //     if (!userPagesId) {
    //         return null;
    //     }
    //
    //     if (pagesSuccess) {
    //         return pagesData?.map((page) => (
    //             <PageLink
    //                 href={page.id}
    //                 key={page.id}
    //                 label={page.visual?.name}
    //                 width={290}
    //                 onPageDelete={() => {
    //                     handlePageRemove(page.id);
    //                 }}
    //                 icon={"MdSummarize"}
    //                 id={page.id}
    //             />
    //         ));
    //     }
    // }, [pagesData]);
    //
    // const favoritesRender = useMemo(() => {
    //     if (!userPagesId) {
    //         return null;
    //     }
    //
    //     if (favoritesSuccess) {
    //         return favoritesData?.map((page) => (
    //             <PageLink
    //                 href={page.id}
    //                 key={page.id}
    //                 label={page.visual?.name}
    //                 width={290}
    //                 onPageDelete={() => {
    //                     handlePageRemove(page.id);
    //                 }}
    //                 icon={"MdSummarize"}
    //                 id={page.id}
    //             />
    //         ));
    //     }
    // }, [favoritesData]);

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
            {/* <PageLink id={""} href={"calendar"} label={"Поиск"} icon={"MdSearch"} /> */}
            <Stack mt={4}>
                <AppLink icon={"MdCalendarMonth"} href={"/calendar"} label={"Календарь"} />
                <Members />
            </Stack>
            <Stack
                mt={2}
                flexDirection={"row"}
                alignItems={"center"}
                >
                <Typography>Избранное</Typography>
            </Stack>
            <Stack gap={1}>{favoritesData?.map((page) => (
                <PageLink
                    href={page.id}
                    key={page.id}
                    label={page.visual?.name}
                    width={290}
                    onPageDelete={() => {
                        handlePageRemove(page.id);
                    }}
                    icon={"MdOutlineFavoriteBorder"}
                    id={page.id}
                />
            ))}
            </Stack>
            <Divider/>
            <Stack
                mt={2}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}>
                <Typography>Все страницы</Typography>
                <Button sx={{ minWidth: 20 }} onClick={handleAddPageClick}>
                    <MaterialIcon name={"MdAdd"} />
                </Button>
            </Stack>
            <Stack gap={1}>{pagesData?.map((page) => (
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
            ))}
            </Stack>
        </>
    );
};

export default PagesList;
