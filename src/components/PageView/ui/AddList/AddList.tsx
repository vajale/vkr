import { Button, Divider, Stack, Typography } from "@mui/material";
import { DocumentBlockType } from "../../model/types";
import { StyledEditBox, StyledListButton } from "../EditList/styled";
import React from "react";
import { useCreateNewPageMutation } from "@/api/firebasePageAPI/pagesEndpoins";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pageActions, selectPage, selectPageId } from "@/store/slices/pageSlice";
import { toast } from "react-toastify";
import info = toast.info;
import { useFirebaseAuth } from "@/components/FireBase";
import { useClickOutside } from "@/utils/hooks/useClickOutside";
import { LucideIcon } from "@/assets/Icon";
import { AnimatePresence } from "framer-motion";
import { selectUser, selectUsername } from "@/store/slices/userSlice";

interface ListProps {
    onAddBlock: () => void;
    onOutsideClick: () => void
}

const AddList = ({ onAddBlock, onOutsideClick }: ListProps) => {
    const dispatch = useAppDispatch();

    const username = useAppSelector(selectUsername);
    const pageId = useAppSelector(selectPageId);
    const page = useAppSelector(selectPage);

    const ref = useClickOutside(onOutsideClick);

    const { refetchUserData } = useFirebaseAuth();

    const [createPage] = useCreateNewPageMutation();

    const handleButtonAdd = (newType: DocumentBlockType) => {
        // if (onAddBlock == null) return;
        //
        // if (newType === DocumentBlockType.IMAGE || newType === DocumentBlockType.QUOTE || DocumentBlockType.LINK) return;

        dispatch(pageActions.addNewBlock({ username, type: newType }));
        onAddBlock();
    };

    const handleCreateTodo = async () => {
        dispatch(pageActions.addNewBlock({ type: DocumentBlockType.TODO, username }));

        if (onAddBlock != null) {
            onAddBlock();
        }
    };

    const handleCreatePage = async () => {
        void createPage({ parentId: pageId }).then((newPageData) => {
            info("Страница добавленна");
            handleButtonAdd(DocumentBlockType.LINK);

            const childLink = newPageData.data.id;

            dispatch(pageActions.addNewPageLinkBlock({ link: childLink, username }));
            dispatch(pageActions.updatePage({ ...page, child: childLink }));
            refetchUserData();
        });

        if (onAddBlock == null) return;
        onAddBlock();
    };

    return (
        <AnimatePresence>
            <StyledEditBox animate={{ scale: 1 }} initial={{ scale: 0 }} ref={ref}>
                <Stack>
                    <Typography sx={{ opacity: 0.8 }} mb={1}>Создать...</Typography>
                    <StyledListButton onClick={() => {
                        handleButtonAdd(DocumentBlockType.TEXT);
                    }}>
                        <Typography>

                            Текст
                        </Typography>
                        <LucideIcon name={'LuListTree'}/>
                    </StyledListButton>
                    <StyledListButton fullWidth
                                      onClick={() => {
                                          handleButtonAdd(DocumentBlockType.CHECKBOX);
                                      }}>
                        <Typography>
                            Чекбокс
                        </Typography>
                        <LucideIcon name={'LuCheck'}/>
                    </StyledListButton>

                    <StyledListButton fullWidth onClick={handleCreateTodo}>
                        <Typography>

                            TO-DO
                        </Typography>
                        <LucideIcon name={'LuList'}/>
                    </StyledListButton>

                    <StyledListButton size={'small'} fullWidth onClick={handleCreatePage}>
                        <Typography>
                            Страницу
                        </Typography>
                        <LucideIcon name={'LuStickyNote'}/>
                    </StyledListButton>
                    <StyledListButton fullWidth onClick={() => {
                        handleButtonAdd(DocumentBlockType.IMAGE);
                    }}>
                        <Typography>

                            Изображение
                        </Typography>
                        <LucideIcon name={'LuImage'}/>
                    </StyledListButton>
                </Stack>
            </StyledEditBox>
        </AnimatePresence>
    );
};

export default AddList;
