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

interface LinkProps {
    href: string,
    id: string
    label?: string,
    isLoading?: boolean,
    parent?: Page,
    showOptionsButton?: boolean
    icon?: MaterialIconName,
    width?: string | number
    height?: string | number
    onPageDelete?: () => void
}

const PageLink = (props: LinkProps) => {
    const {
        label = 'Страница',
        href,
        parent,
        showOptionsButton,
        icon,
        isLoading,
        width,
        height,
        id,
        onPageDelete
    } = props;

    const dispatch = useAppDispatch();

    const [options, setOptions] = useState<{ isOptionsOpen: boolean }>(() => ({ isOptionsOpen: false }));

    const docRef = useRef<HTMLDivElement>(null);
    const [isMouseHover] = useMouseHover(docRef);

    const handleButtonOptionsClick = () => {
        setOptions(prevState => ({ isOptionsOpen: !prevState.isOptionsOpen }));
        console.log(options.isOptionsOpen);
    };

    const buttonIconName = options.isOptionsOpen ? "MdArrowForwardIos" : "MdArrowForwardIos";

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

    return (
        <StyledPageLink>
            <motion.div whileHover={{ scale: 1.01 }}
                        initial={{ scale: 1 }}
                        style={{
                            width,
                            height,
                            display: "flex",
                            justifyContent: "space-between",
                            padding: 7,
                            borderRadius: 7
                        }}
                        ref={docRef} key={href}>
                <Stack>
                    <Stack flexDirection={'row'} gap={1} justifyContent={"space-between"}>
                        <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}
                               width={width}>
                            <Stack flexDirection={'row'} alignItems={'center'}>
                                {showOptionsButton &&
                                    <Button onClick={handleButtonOptionsClick} sx={{ minWidth: 20 }}>
                                        <MaterialIcon name={buttonIconName}/>
                                    </Button>}
                                {icon && <MaterialIcon name={icon}/>}
                                <Link onClick={() => {
                                    dispatch(pageActions.removePage());
                                }} sx={{ textDecoration: 'none', ml: 1, overflow: 'hidden' }} href={"#/page/" + href}>
                                    {label}
                                </Link></Stack>
                            {isMouseHover && showOptionsButton && (
                                <>
                                    <Stack flexDirection={'row'}>
                                        <Button onClick={handleDeletePage} sx={{ minWidth: 20 }}><MaterialIcon name={"MdDelete"}/></Button>
                                        <Button sx={{ minWidth: 20 }}><MaterialIcon name={"MdAdd"}/></Button>
                                    </Stack>
                                </>
                            )}
                        </Stack>

                    </Stack>
                    {options.isOptionsOpen && (
                        <div style={{ height: 28, marginTop: 7 }}>
                            {parent
                                ? <Link href={parent.id}>
                                    {label}
                                </Link>
                                : <Typography ml={4} sx={{ opacity: 0.8 }}>Нет страниц</Typography>}
                        </div>)}
                </Stack>
            </motion.div>
        </StyledPageLink>
    )
        ;
};

export default PageLink;
