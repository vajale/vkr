import React, { useRef, useState } from "react";
import { type SimplyPage, useCreateNewPageMutation, useRemovePageMutation } from "@/api/firebasePageAPI/pagesEndpoins";
import PageLink from "@/components/PageLink/PageLink";
import useToast from "@/utils/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "@/constants/navigation";
import { pageActions } from "@/store/slices/pageSlice";
import { useAppDispatch } from "@/store/hooks";
import { Box, Button, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import { useFirebaseAuth } from "@/components/FireBase";
import { motion } from "framer-motion";
import { useMouseHover } from "@/components/PageView/model/hooks/useMouseHover";

interface LinkProps {
    page: SimplyPage,
    onPageDelete: () => void
    onPageCreated: () => void,
}

const LayoutPageLink = (props: LinkProps) => {
    const { page, onPageDelete, onPageCreated } = props;

    const [options, setOptions] = useState<{ isOptionsOpen: boolean }>(() => ({ isOptionsOpen: false }));
    const { refetchUserData } = useFirebaseAuth();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [removePage] = useRemovePageMutation({});
    const [createPage] = useCreateNewPageMutation();

    const targetHoverRef = useRef<HTMLDivElement>();

    const handlePageRemove = () => {
        void removePage({ pageId: page.id }).then(() => {
            onPageDelete();
        });
    };

    const handleButtonOptionsClick = () => {
        setOptions(prevState => ({ isOptionsOpen: !prevState.isOptionsOpen }));
    };

    const handleCreateChildrenPage = () => {
        void createPage({ parentId: page.id }).then((newPageData) => {
            const newPageId = newPageData.data.id;
            dispatch(pageActions.updatePage({ child: newPageId }));

            onPageCreated();

            navigate(`${NAVIGATION.PAGE}${newPageId}`, { replace: true });
        });

        refetchUserData();
    };

    const buttonIconName = options.isOptionsOpen ? "MdKeyboardArrowDown" : "MdKeyboardArrowRight";

    return (
        <div ref={targetHoverRef}>
            <Stack flexDirection={'row'}>
                <Button onClick={handleButtonOptionsClick} sx={{ minWidth: 30 }}>
                    <MaterialIcon name={buttonIconName}/>
                </Button>
                <PageLink
                    showChildrenButton
                    showOptionsButton
                    href={page.id}
                    label={page.visual?.name}
                    width={210}
                    onPageDelete={handlePageRemove}
                    icon={"MdOutlineDescription"}
                    onChildrenPageCreated={handleCreateChildrenPage}
                />
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                    <Stack mr={2} flexDirection={'row'}>
                        <Button onClick={handlePageRemove} sx={{ minWidth: 20 }}>
                            <MaterialIcon name={"MdDelete"}/>
                        </Button>
                        <Button onClick={handleCreateChildrenPage} sx={{ minWidth: 20 }}>
                            <MaterialIcon name={"MdAdd"}/>
                        </Button>
                    </Stack>
                </motion.div>
            </Stack>
            {options.isOptionsOpen &&
                (page.child &&
                    <Box ml={2}>
                        <LayoutPageLink page={page.child} onPageCreated={onPageCreated} onPageDelete={onPageDelete}/>
                    </Box>
                )
            }
        </div>
    );
};

export default LayoutPageLink;

// {options.isOptionsOpen && (
//     <Box mt={1} ml={7} style={{ height: 28 }}>
//         {page.child
//             ? <div style={{ opacity: 0.9 }}>
//                 <MaterialIcon name={'MdOutlineDescription'}/>
//                 <Link underline={'none'} sx={{ ml: 1 }} href={"#/page/" + page.child}>
//                     {page.child}
//                 </Link>
//             </div>
//             : <Typography ml={4} sx={{ opacity: 0.8 }}>Нет страниц</Typography>
//         }
//     </Box>)}
