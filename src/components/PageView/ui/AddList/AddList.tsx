import { Button, Stack } from "@mui/material";
import { DocumentBlockType } from "../../model/types";
import { StyledBox } from "../EditList/styled";
import React from "react";
import { useCreateNewPageMutation } from "@/api/firebasePageAPI/pagesService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pageActions, selectPage, selectPageId } from "@/store/slices/pageSlice";
import { toast } from "react-toastify";
import info = toast.info;
import { useFirebaseAuth } from "@/components/FireBase";

interface ListProps {
    onAddBlock?: (type: DocumentBlockType) => void;
}

const AddList = ({ onAddBlock }: ListProps) => {
    const dispatch = useAppDispatch();

    const pageId = useAppSelector(selectPageId);
    const page = useAppSelector(selectPage);

    const { refetchUserData } = useFirebaseAuth();

    const [createPage] = useCreateNewPageMutation();

    const handleButtonAdd = (newType: DocumentBlockType) => {
        if (onAddBlock == null) return;

        if (newType === DocumentBlockType.IMAGE || newType === DocumentBlockType.QUOTE || DocumentBlockType.LINK) return;

        dispatch(pageActions.addNewPageLinkBlock(newType));
        onAddBlock(newType);
    };

    const handleCreateTodo = async () => {
        dispatch(pageActions.addNewBlock(DocumentBlockType.TODO));

        if (onAddBlock != null) {
            onAddBlock(DocumentBlockType.TODO);
        }
    };

    const handleCreatePage = async () => {
        void createPage({ parentId: pageId }).then((newPageData) => {
            info('Страница добавленна');
            handleButtonAdd(DocumentBlockType.LINK);

            const childLink = newPageData.data.id;

            dispatch(pageActions.addNewPageLinkBlock({ link: childLink }));
            dispatch(pageActions.updatePage({ ...page, child: childLink }));
            refetchUserData();
        });

        if (onAddBlock == null) return;
        onAddBlock(DocumentBlockType.LINK);
    };

    return (
        <StyledBox width={140} position={'absolute'}>
            <Stack>
                <Button
                    onClick={() => {
                        handleButtonAdd(DocumentBlockType.TEXT);
                    }}>
                    Текстовый блок
                </Button>
                <Button
                    onClick={() => {
                        handleButtonAdd(DocumentBlockType.CHECKBOX);
                    }}>
                    Сделать чекбокс
                </Button>
                <Button
                    onClick={handleCreateTodo}>
                    Сделать TO-DO
                </Button>
                <Button
                    onClick={handleCreatePage}>
                    Создать ссылку на страницу
                </Button>
            </Stack>
        </StyledBox>
    );
};

export default AddList;
