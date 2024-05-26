import React, { useRef, useState } from "react";

import { Button, Link, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import { type Page } from "@/components/PageView/model/types";
import { useMouseHover } from "@/components/PageView/model/hooks/useMouseHover";
import { motion } from "framer-motion";
import { type MaterialIconName } from "@/assets/icons";
import { StyledPageLink } from "@/components/PageLink/styled";
import { useAppDispatch } from "@/store/hooks";
import { pageActions } from "@/store/slices/pageSlice";
import { userActions } from "@/store/slices/userSlice";
import { useCreateNewPageMutation } from "@/api/firebasePageAPI/pagesService";

interface LinkProps {
    href: string,
    label?: string,
    isLoading?: boolean,
    showOptionsButton?: boolean
    showChildrenButton?: boolean
    icon?: MaterialIconName,
    children?: React.ReactNode,
    width?: string | number
    height?: string | number
    onPageDelete?: () => void,
    onChildrenPageCreated: () => void
}

const PageLink = (props: LinkProps) => {
    const {
        label = 'Страница',
        href,
        showOptionsButton,
        icon,
        isLoading,
        width,
        height,
        onPageDelete, children, onChildrenPageCreated
    } = props;

    if (isLoading) {
        return (
            <Skeleton width={width} height={height}/>
        );
    }

    const handleDeletePage = () => {
        if (onPageDelete != null) {
            onPageDelete();
        }
    };

    const handleCreateChildrenPage = () => {
        if (onChildrenPageCreated != null) {
            onChildrenPageCreated();
        }
    };

    return (
        <StyledPageLink>
            <Stack justifyContent={'space-between'}>
                <Stack flexDirection={'row'} gap={1} justifyContent={"space-between"}>
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}
                           width={width}>
                        <Stack flexDirection={'row'} alignItems={'center'}>
                            {icon && <MaterialIcon name={icon}/>}
                            <Link sx={{ textDecoration: 'none', ml: 1, overflow: 'hidden' }} href={"#/page/" + href}>
                                {children ?? label}
                            </Link>
                        </Stack>
                        {showOptionsButton && <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                            <Stack mr={2} flexDirection={'row'}>
                                <Button onClick={handleDeletePage} sx={{ minWidth: 20 }}>
                                    <MaterialIcon name={"MdDelete"}/>
                                </Button>
                                <Button onClick={handleCreateChildrenPage} sx={{ minWidth: 20 }}>
                                    <MaterialIcon name={"MdAdd"}/>
                                </Button>
                            </Stack>
                        </motion.div>}
                    </Stack>
                </Stack>
            </Stack>
        </StyledPageLink>
    )
        ;
};

export default PageLink;
