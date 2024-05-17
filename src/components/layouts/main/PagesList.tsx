import { Button, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import PageLink from "@/components/PageLink/PageLink";
import {
    useCreateNewPageMutation, useFetchPagesQuery,
    useLazyFetchPagesQuery, useRemovePageMutation
} from "@/components/PageView/model/services/firebaseDocumentsAPI";
import { MaterialIcon } from "@/assets/Icon";
import { useAppSelector } from "@/store/hooks";
import { selectUserPages } from "@/store/slices/userSlice";

interface ListProps {
    onPageChanged: () => void,
    pageIds: string[]
}

const PagesList = (props: ListProps) => {
    const { onPageChanged, pageIds } = props;

    const pages = useAppSelector(selectUserPages);
    const { data: pagesData, isSuccess: pagesSuccess, isLoading: isPagesLoading } = useFetchPagesQuery(pages);
    const [createPage] = useCreateNewPageMutation({});
    const [removePage] = useRemovePageMutation({});

    if (pages === undefined) {
        return null;
    }

    const handleAddPageClick = () => {
        void createPage({}).then(() => { onPageChanged(); });
    };

    const handlePageRemove = (pageId: string) => {
        void removePage({ pageId }).then(() => { onPageChanged(); });
    };

    const pagesRender = useMemo(() => {
        if (pages.length == 0) {
            return null;
        }

        if (isPagesLoading) {
            return (
                <div>
                    <Skeleton width={290} height={50}/>
                    <Skeleton width={290} height={50}/>
                    <Skeleton width={290} height={50}/>
                </div>
            );
        }
        if (pagesSuccess && pagesSuccess) {
            return pagesData?.map(page => (
                <PageLink showOptionsButton
                          href={page.id}
                          key={page.id}
                          label={page.visual?.name}
                          width={290}
                          onPageDelete={() => { handlePageRemove(page.id); }}
                          icon={"MdSummarize"} id={page.id}/>
            ));
        }
    }, [pagesData, pageIds]);

    return (
        <>
            <Stack mt={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography>Страницы</Typography>
                <Button sx={{ minWidth: 20 }} onClick={handleAddPageClick}><MaterialIcon name={'MdAdd'}/></Button>
            </Stack>
            <Stack gap={1}>
                {pagesRender}
            </Stack>
        </>
    );
};

export default PagesList;
