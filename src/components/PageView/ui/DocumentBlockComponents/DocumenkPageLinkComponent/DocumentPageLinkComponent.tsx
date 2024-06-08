import { type DocumentPageLinkBlock } from "../../../model/types";
import React from "react";
import { Link, Skeleton, Stack, Typography } from "@mui/material";
import PageLink from "@/components/PageLink/PageLink";
import { useAppSelector } from "@/store/hooks";
import { selectPage, selectPageId, selectPageName } from "@/store/slices/pageSlice";
import { MaterialIcon } from "@/assets/Icon";
import { useGetUserByIdQuery } from "@/api/usersApi/usersFirebaseEndpoints";
import { useFetchPageDataQuery } from "@/api/firebasePageAPI/pagesEndpoins";

interface PageLinkProps {
    label?: string,
    block: DocumentPageLinkBlock
}

export const DocumentPageLinkComponent = (props: PageLinkProps) => {
    const { block } = props;

    const { data, isLoading } = useFetchPageDataQuery({ pageId: block.src });

    if (data === undefined) {
        return <span>нет страницы</span>;
    }

    if (block.src === '') {
        return <span>нет страницы</span>;
    }

    const pageName = data?.visual?.name ?? block.id;
    const backgroundColor = block.textType?.backgroundColor !== undefined ? block.textType?.backgroundColor : 'none';

    return (
        <div style={{ backgroundColor, borderRadius: '7px' }}>
            <Stack flexDirection={'row'} alignItems={'center'}>
                <MaterialIcon name={'MdDescription'}/>
                {isLoading
                    ? <Skeleton height={24} width={90}/>
                    : <PageLink href={block.src}>
                        <Typography mr={1}>{pageName}</Typography>
                    </PageLink>}
            </Stack>
        </div>
    );
};
