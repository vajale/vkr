import { Button, Divider, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import {
    useCreateNewPageMutation,
    useFetchPagesQuery,
    useRemovePageMutation,
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

    const items1 = [
        { id: 1, name: 'Item 1', child: undefined },
        { id: 2, name: 'Item 2', child: 1 },
        { id: 4, name: 'Item 4', child: 5 },
        { id: 5, name: 'Item 5', child: undefined },
    ];

    const allPages = pagesData && buildDeepHierarchy(pagesData);
    //
    // if (pagesData) {
    //     console.log(buildDeepHierarchy(pagesData));
    // }

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
                <AppLink icon={"MdCalendarMonth"} href={"/calendar"} label={"Календарь"}/>
                <Members/>
            </Stack>
            <Stack mt={2} flexDirection={"row"} alignItems={"center"}>
                <Typography>Избранное</Typography>
            </Stack>
            <Stack gap={1}>
                {favoritesData?.map((page) => (
                    <FavoritePageLink
                        page={page}
                        key={page.id}
                    />
                ))}
            </Stack>
            <Divider/>
            <Stack mt={2} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography>Все страницы</Typography>
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
        </>
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
