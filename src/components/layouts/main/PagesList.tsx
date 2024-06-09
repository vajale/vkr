import { Box, Button, Divider, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import {
    useCreateNewPageMutation,
    useFetchPagesQuery,
} from "@/api/firebasePageAPI/pagesEndpoins";
import { MaterialIcon } from "@/assets/Icon";
import { useAppSelector } from "@/store/hooks";
import { selectUserAuth, selectUserFavorites, selectUserPages } from "@/store/slices/userSlice";
import Constants from "@/constants";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "@/constants/navigation";
import { Members } from "@/components/StatickBlocks/Members";
import AppLink from "@/components/AppLink/AppLink";
import useToast from "@/utils/hooks/useToast";
import LayoutPageLink from "@/components/layouts/main/LayoutPageLink";
import FavoritePageLink from "@/components/layouts/main/FavoritePageLink";
import { buildDeepHierarchy } from "@/utils/helper/helpers";
import { useFirebaseAuth } from "@/components/FireBase";

// @ts-expect-error
import LogoSvg from "@/assets/svg/logo.svg";
import { TITLES } from "@/components/Login/constants";

interface ListProps {
    onPageChanged: () => void;
}

const PagesList = (props: ListProps) => {
    const { onPageChanged } = props;

    const navigate = useNavigate();

    const { info, warning, notify } = useToast();

    const { refetchUserData } = useFirebaseAuth();

    const userPagesId = useAppSelector(selectUserPages);
    const userFavoritesId = useAppSelector(selectUserFavorites);
    const isAuth = useAppSelector(selectUserAuth);

    const { data: pagesData, isLoading: isPagesLoading, refetch } = useFetchPagesQuery(userPagesId);
    const { data: favoritesData, isLoading: isFavoritesLoading } = useFetchPagesQuery(userFavoritesId);

    const [createPage, { isLoading: isLoadingCreatingNewPage, data: newPageId }] = useCreateNewPageMutation();

    useEffect(() => {
        if (!isLoadingCreatingNewPage && newPageId) {
            navigate(`${NAVIGATION.PAGE}${newPageId.id}`, { replace: true });
        }
    }, [newPageId, isLoadingCreatingNewPage]);

    const handleAddPageClick = () => {
        void createPage({ parentId: '' }).then(() => {
            info('Страница добавленна');
            onPageChanged();
        });
    };

    const handlePageRemove = () => {
        void refetch();
        onPageChanged();
        warning('Страница удаленна');
    };

    const handleChildPageCreated = () => {
        void refetch();
        onPageChanged();
        notify('Дочерняя страница добавленна');
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
                <Skeleton width={290} height={50}/>
                <Skeleton width={290} height={50}/>
                <Skeleton width={290} height={50}/>
                <Skeleton width={290} height={50}/>
                <Skeleton width={290} height={50}/>
                <Skeleton width={290} height={50}/>
            </div>
        );
    }

    const allPages = pagesData && buildDeepHierarchy(pagesData);

    return (
        <div style={{ width: '100%' }}>
            <Box mt={3}>
                <img src={LogoSvg} alt={TITLES.IMAGE_ALT}/>
            </Box>
            <Stack mt={4} alignItems={'flex-start'}>
                <AppLink icon={"MdCalendarMonth"} href={"/calendar"} label={"Календарь"}/>
                <Members/>
            </Stack>
            <Typography sx={{ opacity: 0.8 }} mt={2}>Избранное</Typography>
            <Stack gap={1} ml={1} mt={1} mb={1}>
                {favoritesData?.map((page) => (
                    <FavoritePageLink
                        page={page}
                        key={page.id}
                    />
                ))}
            </Stack>
            <Divider/>
            <Stack width={300} mt={2} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography sx={{ opacity: 0.8 }} mb={1}>Все страницы</Typography>
                <Button sx={{ minWidth: 20 }} onClick={handleAddPageClick}>
                    <MaterialIcon name={"MdAdd"}/>
                </Button>
            </Stack>
            <Stack gap={1}>
                {/* <Hierarchy items={buildDeepHierarchy(items)}/> */}
                {pagesData && allPages.map((page) => (
                    <LayoutPageLink key={page.id}
                                    page={page}
                                    onPageCreated={handleChildPageCreated}
                                    onPageDelete={handlePageRemove}
                    />
                ))}
            </Stack>
        </div>
    );
};

export default PagesList;

// const Item = ({ item }) => {
//     return (
//         <div style={{ marginLeft: '20px', border: '1px solid gray', padding: '10px' }}>
//             <div>{item.name}</div>
//             {item.child && <Item item={item.child} />}
//         </div>
//     );
// };
//
// const Hierarchy = ({ items }) => {
//     return (
//         <div>
//             {items?.map(item => (
//                 <Item key={item.id} item={item} />
//             ))}
//         </div>
//     );
// };
