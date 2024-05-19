import { Link, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import React from "react";
import { StyledPageLink } from "@/components/PageLink/styled";
import type { MaterialIconName } from "@/assets/icons";
import { motion } from "framer-motion";

interface LinkProps {
    href: string,
    label: string,
    icon: MaterialIconName,
}

const AppLink = (props: LinkProps) => {
    const { label, icon, href } = props;

    return (
        <StyledPageLink>
            <motion.div whileHover={{ scale: 1.01 }}
                        initial={{ scale: 1 }}>
                <Link id={""} href={'#' + href} padding={1} underline={'none'}>
                    <Stack flexDirection={'row'} gap={1} alignItems={'center'} justifyContent={'space-between'}>
                        <MaterialIcon name={icon}/>
                            {label}
                    </Stack>
                </Link>
            </motion.div>
        </StyledPageLink>

    );
};

export default AppLink;
