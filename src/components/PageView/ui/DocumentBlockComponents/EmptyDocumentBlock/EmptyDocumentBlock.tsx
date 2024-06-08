import React from "react";
import { pageActions, selectPageDocuments } from "@/store/slices/pageSlice";
import { DocumentBlockType } from "@/components/PageView/model/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser, selectUsername } from "@/store/slices/userSlice";

interface BlockProps {
    onClick: () => void,
}

const EmptyDocumentBlock = (props: BlockProps) => {
    const { onClick } = props;

    const dispatch = useAppDispatch();
    const blocks = useAppSelector(selectPageDocuments);
    const username = useAppSelector(selectUsername);

    const handleEmptySpaceClick = async () => {
        if (blocks[blocks.length - 1].content !== '') {
            dispatch(pageActions.addNewBlock({ type: DocumentBlockType.TEXT, username }));
            if (onClick) {
                onClick();
            }
        };
    };

    return (
        <div aria-placeholder={'241'} onMouseDown={handleEmptySpaceClick} style={{ height: 200, cursor: 'text' }}>

        </div>
    );
};
export default EmptyDocumentBlock;
