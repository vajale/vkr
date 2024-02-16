import React, {useMemo, useState} from "react";

import {blockTypes} from "../../../model/hooks/documentParser";


interface BlockAddButtonProps {
    onClick?: () => void;
    buttonContent: string
}

const BlockAddButton = (props: BlockAddButtonProps) => {
    const {onClick, buttonContent} = props;
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const handleClick = () => {
        if (!onClick) return;

        onClick();
    };

    const typeList = useMemo(
        () =>
            Object.entries(blockTypes).map((item, index) => (
                <li key={index}>item</li>
            )),
        [blockTypes],
    );

    return (
        <button onClick={handleClick}>
            {buttonContent}
            {isMenuOpen && <ul>{typeList}</ul>}
        </button>
    );
};

export default BlockAddButton;
