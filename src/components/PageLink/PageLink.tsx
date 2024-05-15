import React, { useRef, useState } from "react";

import { Button, Link, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import { type Page } from "@/components/PageView/model/types";
import { useMouseHover } from "@/components/PageView/model/hooks/useMouseHover";
import { motion } from "framer-motion";
import { type MaterialIconName } from "@/assets/icons";
import { StyledPageLink } from "@/components/PageLink/styled";

interface LinkProps {
    href: string,
    label?: string,
    isLoading?: boolean,
    parent?: Page,
    showOptionsButton?: boolean
    icon?: MaterialIconName,
    width?: string | number
    height?: string | number
}

const PageLink = (props: LinkProps) => {
    const { label = 'Страница', href, parent, showOptionsButton, icon, isLoading, width, height } = props;

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
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} width={width}>
                        <Stack flexDirection={'row'} alignItems={'center'}>
                            {showOptionsButton &&
                                <Button onClick={handleButtonOptionsClick} sx={{ minWidth: 20 }}>
                                    <MaterialIcon name={buttonIconName}/>
                                </Button>}
                            {icon && <MaterialIcon name={icon}/>}
                            <Link sx={{ textDecoration: 'none', ml: 1 }} href={"#/page/" + href}>
                                {label}
                            </Link></Stack>
                        {isMouseHover && showOptionsButton &&
                            <Button sx={{ minWidth: 20 }}><MaterialIcon name={"MdAdd"}/></Button>}
                    </Stack>

                </Stack>
                {options.isOptionsOpen && (
                    <div style={{ height: 28, marginTop: 7 }}>
                        {parent
                            ? <Link underline href={parent.id}>
                                {label}
                            </Link>
                            : <Typography ml={4} sx={{ opacity: 0.8 }}>Нет страниц</Typography>}
                    </div>)}
            </Stack>
        </motion.div>
        </StyledPageLink>
    );
};

export default PageLink;
