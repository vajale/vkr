import React from "react";

import { Link, Skeleton, Stack } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";

import { type MaterialIconName } from "@/assets/icons";
import { StyledPageLink } from "@/components/PageLink/styled";

interface LinkProps {
    href: string;
    label?: string;
    isLoading?: boolean;
    showOptionsButton?: boolean;
    showChildrenButton?: boolean;
    icon?: MaterialIconName;
    children?: React.ReactNode;
    width?: string | number;
    height?: string | number;
    onPageDelete?: () => void;
    onChildrenPageCreated: () => void;
}

const PageLink = (props: LinkProps) => {
    const {
        label = "Страница",
        href,
        showOptionsButton,
        icon,
        isLoading,
        width,
        height,
        onPageDelete,
        children,
        onChildrenPageCreated,
    } = props;

    if (isLoading) {
        return <Skeleton width={width} height={height} />;
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
            <Stack justifyContent={"space-between"}>
                <Stack flexDirection={"row"} gap={1} justifyContent={"space-between"}>
                    <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        jus
                        tifyContent={"space-between"}
                        width={width}>
                        <Stack flexDirection={"row"} alignItems={"center"}>
                            {icon && <MaterialIcon name={icon} />}
                            <Link
                                sx={{ textDecoration: "none", ml: 1, overflow: "hidden" }}
                                href={"#/page/" + href}>
                                {children ?? label}
                            </Link>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </StyledPageLink>
    );
};

export default PageLink;
